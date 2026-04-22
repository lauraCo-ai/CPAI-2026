"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Palette,
  Sun,
  Moon,
  Layers,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { componentsRegistry } from "@/lib/components-registry";

interface AppSidebarProps {
  isDark: boolean;
  onToggleDark: (value: boolean) => void;
  /** "fixed" renders a fixed-position left sidebar; "inline" fills its parent (e.g. inside a Sheet). */
  variant?: "fixed" | "inline";
  /** Called after a nav link is clicked — useful to close the mobile drawer. */
  onNavigate?: () => void;
}

export function AppSidebar({
  isDark,
  onToggleDark,
  variant = "fixed",
  onNavigate,
}: AppSidebarProps) {
  const pathname = usePathname();
  const isDesignSystemSection = pathname.startsWith("/design-system");
  const [designSystemOpen, setDesignSystemOpen] = useState(isDesignSystemSection);

  const wrapperClass =
    variant === "fixed"
      ? "fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-sidebar-border bg-sidebar"
      : "flex h-full w-full flex-col bg-sidebar";

  return (
    <aside className={wrapperClass}>
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Layers className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold font-[family-name:var(--font-heading)] text-sidebar-foreground">
            HeyStack
          </p>
          <p className="text-xs text-muted-foreground">2026 Theme</p>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {/* Dashboard */}
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            pathname === "/dashboard"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>

        {/* Design System collapsible */}
        <Collapsible open={designSystemOpen} onOpenChange={setDesignSystemOpen}>
          <CollapsibleTrigger asChild>
            <button
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isDesignSystemSection
                  ? "text-sidebar-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <Palette className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left">Design System</span>
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                  designSystemOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="mt-1 space-y-0.5">
              {/* Overview */}
              <Link
                href="/design-system"
                onClick={onNavigate}
                className={`flex items-center gap-2 rounded-lg pl-9 pr-3 py-1.5 text-xs font-medium transition-colors ${
                  pathname === "/design-system"
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                Overview
              </Link>

              {/* Foundations */}
              <Link
                href="/design-system/foundations"
                onClick={onNavigate}
                className={`flex items-center gap-2 rounded-lg pl-9 pr-3 py-1.5 text-xs font-medium transition-colors ${
                  pathname === "/design-system/foundations"
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <BookOpen className="h-3 w-3 shrink-0" />
                Foundations
              </Link>

              <Separator className="my-2 mx-3" />

              {/* Component links */}
              {componentsRegistry.map((component) => {
                const href = `/design-system/${component.slug}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={component.slug}
                    href={href}
                    onClick={onNavigate}
                    className={`flex items-center rounded-lg pl-9 pr-3 py-1.5 text-xs transition-colors ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    }`}
                  >
                    {component.name}
                  </Link>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </nav>

      {/* Dark Mode Toggle */}
      <div className="border-t border-sidebar-border px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isDark ? (
              <Moon className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Sun className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="text-sm text-muted-foreground">
              {isDark ? "Dark" : "Light"} mode
            </span>
          </div>
          <Switch checked={isDark} onCheckedChange={onToggleDark} />
        </div>
      </div>
    </aside>
  );
}
