#!/usr/bin/env node

/**
 * HeyStack Token Lint
 *
 * Scans .tsx, .jsx, .ts, .css files for hardcoded values that should
 * be using design system tokens from heystack-design-system.json.
 *
 * Usage:
 *   node lint-tokens.mjs [directory] [--fix-suggestions] [--json]
 *
 * Examples:
 *   node lint-tokens.mjs src/components
 *   node lint-tokens.mjs src --json
 *   node lint-tokens.mjs .
 */

import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, resolve, extname, relative } from "path";

// ── Config ──

const SCAN_EXTENSIONS = new Set([".tsx", ".jsx", ".ts", ".css", ".scss"]);
const IGNORE_DIRS = new Set(["node_modules", ".next", "dist", "build", ".git", "coverage"]);

// ── Load tokens ──

function findTokenFile(startDir) {
  const candidates = [
    join(startDir, "tokens", "heystack-design-system.json"),
    join(startDir, "heystack-design-system.json"),
    join(startDir, "design-system", "heystack-design-system.json"),
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  // Walk up
  const parent = resolve(startDir, "..");
  if (parent !== startDir) return findTokenFile(parent);
  return null;
}

function extractHexColors(obj, path = "") {
  const colors = new Map();
  if (!obj || typeof obj !== "object") return colors;
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const currentPath = path ? `${path}.${key}` : key;
    if (typeof val === "string" && val.startsWith("#")) {
      colors.set(val.toUpperCase(), currentPath);
    } else if (val && typeof val === "object") {
      if (val.value && typeof val.value === "string" && val.value.startsWith("#")) {
        colors.set(val.value.toUpperCase(), currentPath);
      }
      for (const [k, v] of extractHexColors(val, currentPath)) {
        if (!colors.has(k)) colors.set(k, v);
      }
    }
  }
  return colors;
}

function extractSpacingValues(obj) {
  const values = new Map();
  if (!obj || typeof obj !== "object") return values;
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    if (typeof val === "number") {
      values.set(val, key);
    }
  }
  return values;
}

function extractRadiusValues(obj) {
  const values = new Map();
  if (!obj || typeof obj !== "object") return values;
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    if (typeof val === "number") {
      values.set(val, `radius-${key}`);
    }
  }
  return values;
}

function extractFontSizes(obj) {
  const values = new Map();
  if (!obj || typeof obj !== "object") return values;
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    if (val && typeof val === "object" && val["font-size"]) {
      values.set(val["font-size"], `text-${key}`);
    }
  }
  return values;
}

// ── Violation patterns ──

function createCheckers(tokens) {
  const hexColors = extractHexColors(tokens.colors || {});
  const spacingMap = extractSpacingValues(tokens.spacing || {});
  const radiusMap = extractRadiusValues(tokens.radius || {});
  const fontSizeMap = extractFontSizes(tokens.typography?.type_scale || {});

  // Known color hex values from the token file
  const tokenHexSet = new Set([...hexColors.keys()]);

  // Common Tailwind arbitrary value patterns
  const ARBITRARY_COLOR = /(?:bg|text|border|ring|fill|stroke|shadow|outline|accent|caret|decoration)-\[#[0-9a-fA-F]{3,8}\]/g;
  const ARBITRARY_SPACING = /(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|space-x|space-y|w|h|min-w|min-h|max-w|max-h|inset|top|right|bottom|left)-\[\d+px\]/g;
  const ARBITRARY_RADIUS = /rounded-\[\d+px\]/g;
  const ARBITRARY_FONT_SIZE = /text-\[\d+px\]/g;

  // Raw hex in style props or CSS
  const RAW_HEX_IN_STYLE = /#[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?/g;

  // Inline style objects with hardcoded values
  const INLINE_COLOR_STYLE = /(?:color|backgroundColor|borderColor|background)\s*:\s*['"]#[0-9a-fA-F]{3,8}['"]/g;
  const INLINE_PX_STYLE = /(?:padding|margin|gap|fontSize|borderRadius|width|height)(?:Top|Bottom|Left|Right)?\s*:\s*\d+/g;

  return {
    hexColors,
    tokenHexSet,
    checkers: [
      {
        name: "arbitrary-color",
        description: "Arbitrary Tailwind color — use a semantic token class instead",
        pattern: ARBITRARY_COLOR,
        severity: "error",
        suggest: (match) => {
          const hex = match.match(/#[0-9a-fA-F]{3,8}/)?.[0]?.toUpperCase();
          const token = hex ? hexColors.get(hex) : null;
          return token ? `Use token: ${token}` : "Map to a semantic color token";
        },
      },
      {
        name: "arbitrary-spacing",
        description: "Arbitrary Tailwind spacing — use a spacing scale value instead",
        pattern: ARBITRARY_SPACING,
        severity: "warning",
        suggest: (match) => {
          const px = parseInt(match.match(/\d+/)?.[0] || "0");
          const token = spacingMap.get(px);
          return token ? `Use spacing-${token}` : `Map ${px}px to nearest spacing token`;
        },
      },
      {
        name: "arbitrary-radius",
        description: "Arbitrary Tailwind border-radius — use a radius token instead",
        pattern: ARBITRARY_RADIUS,
        severity: "warning",
        suggest: (match) => {
          const px = parseInt(match.match(/\d+/)?.[0] || "0");
          const token = radiusMap.get(px);
          return token ? `Use ${token}` : `Map ${px}px to nearest radius token`;
        },
      },
      {
        name: "arbitrary-font-size",
        description: "Arbitrary Tailwind font size — use the type scale instead",
        pattern: ARBITRARY_FONT_SIZE,
        severity: "warning",
        suggest: (match) => {
          const px = parseInt(match.match(/\d+/)?.[0] || "0");
          const token = fontSizeMap.get(px);
          return token ? `Use ${token}` : `Map ${px}px to nearest type scale token`;
        },
      },
      {
        name: "inline-hardcoded-color",
        description: "Hardcoded hex color in inline style — use CSS variable or token",
        pattern: INLINE_COLOR_STYLE,
        severity: "error",
        suggest: (match) => {
          const hex = match.match(/#[0-9a-fA-F]{3,8}/)?.[0]?.toUpperCase();
          const token = hex ? hexColors.get(hex) : null;
          return token ? `Use CSS var: var(--${token.replace(/\./g, "-")})` : "Map to a semantic CSS variable";
        },
      },
      {
        name: "inline-hardcoded-px",
        description: "Hardcoded pixel value in inline style — use a token-based value",
        pattern: INLINE_PX_STYLE,
        severity: "warning",
        suggest: () => "Use a token-based CSS variable or Tailwind class",
      },
    ],

    // Special checker for raw hex in CSS/style blocks that aren't in our token set
    checkRawHex(content, filePath) {
      const violations = [];
      // Only flag hex values in CSS files or style attributes
      const isCSSFile = filePath.endsWith(".css") || filePath.endsWith(".scss");
      if (!isCSSFile) return violations;

      let match;
      const regex = new RegExp(RAW_HEX_IN_STYLE.source, "g");
      while ((match = regex.exec(content)) !== null) {
        const hex = match[0].toUpperCase();
        // Skip if it's a known token value (those are fine in CSS var definitions)
        if (hex === "#000000" || hex === "#FFFFFF" || hex === "#FFF") continue;
        // Find line number
        const line = content.substring(0, match.index).split("\n").length;
        const token = hexColors.get(hex);
        violations.push({
          rule: "raw-hex-in-css",
          severity: "warning",
          line,
          match: match[0],
          message: "Raw hex color in CSS — prefer CSS variables from the token system",
          suggestion: token ? `Use var(--${token.replace(/\./g, "-")})` : "Map to a semantic CSS variable",
        });
      }
      return violations;
    },
  };
}

// ── File scanning ──

function walkDir(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    if (IGNORE_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...walkDir(full));
    } else if (SCAN_EXTENSIONS.has(extname(entry))) {
      files.push(full);
    }
  }
  return files;
}

function lintFile(filePath, checkerSet) {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const violations = [];

  for (const checker of checkerSet.checkers) {
    let match;
    const regex = new RegExp(checker.pattern.source, checker.pattern.flags);
    while ((match = regex.exec(content)) !== null) {
      const line = content.substring(0, match.index).split("\n").length;
      violations.push({
        rule: checker.name,
        severity: checker.severity,
        line,
        match: match[0],
        message: checker.description,
        suggestion: checker.suggest(match[0]),
      });
    }
  }

  violations.push(...checkerSet.checkRawHex(content, filePath));
  return violations;
}

// ── Main ──

function main() {
  const args = process.argv.slice(2);
  const jsonOutput = args.includes("--json");
  const scanDir = resolve(args.find((a) => !a.startsWith("--")) || "src");

  if (!existsSync(scanDir)) {
    console.error(`Path not found: ${scanDir}`);
    process.exit(1);
  }

  const tokenPath = findTokenFile(process.cwd());
  if (!tokenPath) {
    console.error("Could not find heystack-design-system.json in project tree.");
    console.error("Expected locations: tokens/, root, or design-system/");
    process.exit(1);
  }

  const tokens = JSON.parse(readFileSync(tokenPath, "utf-8"));
  const checkerSet = createCheckers(tokens);

  const stat = statSync(scanDir);
  const files = stat.isDirectory()
    ? walkDir(scanDir)
    : SCAN_EXTENSIONS.has(extname(scanDir))
      ? [scanDir]
      : [];

  let totalErrors = 0;
  let totalWarnings = 0;
  const results = {};

  for (const filePath of files) {
    const violations = lintFile(filePath, checkerSet);
    if (violations.length > 0) {
      const rel = relative(process.cwd(), filePath);
      results[rel] = violations;
      for (const v of violations) {
        if (v.severity === "error") totalErrors++;
        else totalWarnings++;
      }
    }
  }

  if (jsonOutput) {
    console.log(JSON.stringify({ totalErrors, totalWarnings, files: results }, null, 2));
  } else {
    if (Object.keys(results).length === 0) {
      console.log("✅ No token violations found.");
    } else {
      for (const [file, violations] of Object.entries(results)) {
        console.log(`\n${file}`);
        for (const v of violations) {
          const icon = v.severity === "error" ? "❌" : "⚠️";
          console.log(`  ${icon} L${v.line}: [${v.rule}] ${v.match}`);
          console.log(`     ${v.message}`);
          if (v.suggestion) console.log(`     → ${v.suggestion}`);
        }
      }
      console.log(`\n${totalErrors} error(s), ${totalWarnings} warning(s) across ${Object.keys(results).length} file(s)`);
    }

    if (totalErrors > 0) process.exit(1);
  }
}

main();
