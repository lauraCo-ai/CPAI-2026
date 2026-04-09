"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sun,
  Moon,
  Palette,
  Type,
  LayoutGrid,
  FormInput,
  BarChart3,
  Box,
  Layers,
  CircleAlert,
  Info,
  Check,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

/* ─── Color Swatch ─── */

function ColorSwatch({
  name,
  cssVar,
  fgVar,
  description,
}: {
  name: string;
  cssVar: string;
  fgVar?: string;
  description?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col gap-1.5">
            <div
              className="h-14 w-full rounded-lg border border-border"
              style={{ backgroundColor: `var(--${cssVar})` }}
            />
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-foreground">{name}</p>
              <p className="text-xs text-muted-foreground font-mono">
                --{cssVar}
              </p>
            </div>
          </div>
        </TooltipTrigger>
        {description && (
          <TooltipContent>
            <p>{description}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

/* ─── Section Wrapper ─── */

function Section({
  id,
  icon: Icon,
  title,
  description,
  children,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="heading-sm text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

/* ─── Main Dashboard ─── */

export default function ThemeDashboard() {
  const [isDark, setIsDark] = useState(false);
  const [progress, setProgress] = useState(45);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  /* Animate progress bar on mount */
  useEffect(() => {
    const timer = setTimeout(() => setProgress(72), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* ─── Sticky Header ─── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between container-px py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Layers className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-foreground">
                HeyStack Design System
              </h1>
              <p className="text-xs text-muted-foreground">2026 Theme</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch checked={isDark} onCheckedChange={setIsDark} />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </header>

      {/* ─── Content ─── */}
      <main className="mx-auto max-w-7xl container-px py-10 space-y-16">
        {/* ═══ NAV PILLS ═══ */}
        <nav className="flex flex-wrap gap-2">
          {[
            { href: "#colors", label: "Colors" },
            { href: "#typography", label: "Typography" },
            { href: "#buttons", label: "Buttons" },
            { href: "#cards", label: "Cards" },
            { href: "#forms", label: "Forms" },
            { href: "#data-display", label: "Data Display" },
            { href: "#feedback", label: "Feedback" },
            { href: "#charts", label: "Charts" },
          ].map((item) => (
            <a key={item.href} href={item.href}>
              <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                {item.label}
              </Badge>
            </a>
          ))}
        </nav>

        {/* ═══ 1. COLORS ═══ */}
        <Section
          id="colors"
          icon={Palette}
          title="Color Palette"
          description="Semantic color tokens from the HeyStack 2026 theme"
        >
          {/* Core Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Core Colors</CardTitle>
              <CardDescription>
                Primary brand, background, and surface colors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                <ColorSwatch name="Primary" cssVar="primary" description="Buttons, links, focus rings" />
                <ColorSwatch name="Primary FG" cssVar="primary-foreground" description="Text on primary" />
                <ColorSwatch name="Background" cssVar="background" description="Page background" />
                <ColorSwatch name="Foreground" cssVar="foreground" description="Body text" />
                <ColorSwatch name="Card" cssVar="card" description="Card surfaces" />
                <ColorSwatch name="Card FG" cssVar="card-foreground" description="Text on cards" />
              </div>
            </CardContent>
          </Card>

          {/* Semantic Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Semantic Colors</CardTitle>
              <CardDescription>
                Contextual colors for UI states and elements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                <ColorSwatch name="Secondary" cssVar="secondary" description="Secondary buttons" />
                <ColorSwatch name="Secondary FG" cssVar="secondary-foreground" description="Text on secondary" />
                <ColorSwatch name="Muted" cssVar="muted" description="Subdued backgrounds" />
                <ColorSwatch name="Muted FG" cssVar="muted-foreground" description="Secondary text" />
                <ColorSwatch name="Accent" cssVar="accent" description="Highlights" />
                <ColorSwatch name="Accent FG" cssVar="accent-foreground" description="Text on accent" />
                <ColorSwatch name="Destructive" cssVar="destructive" description="Error states" />
                <ColorSwatch name="Destructive FG" cssVar="destructive-foreground" description="Text on destructive" />
                <ColorSwatch name="Border" cssVar="border" description="Borders, dividers" />
                <ColorSwatch name="Input" cssVar="input" description="Form input borders" />
                <ColorSwatch name="Ring" cssVar="ring" description="Focus ring" />
                <ColorSwatch name="Popover" cssVar="popover" description="Dropdown backgrounds" />
              </div>
            </CardContent>
          </Card>

          {/* Chart Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Chart Palette</CardTitle>
              <CardDescription>
                Data visualization colors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="flex-1 space-y-1.5">
                    <div
                      className="h-20 rounded-lg"
                      style={{ backgroundColor: `var(--chart-${n})` }}
                    />
                    <p className="text-xs text-center text-muted-foreground font-mono">
                      chart-{n}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sidebar Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sidebar Colors</CardTitle>
              <CardDescription>
                Dedicated sidebar surface and interaction tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                <ColorSwatch name="Sidebar" cssVar="sidebar" description="Sidebar background" />
                <ColorSwatch name="Sidebar FG" cssVar="sidebar-foreground" description="Sidebar text" />
                <ColorSwatch name="Sidebar Primary" cssVar="sidebar-primary" description="Sidebar primary actions" />
                <ColorSwatch name="Sidebar Accent" cssVar="sidebar-accent" description="Sidebar highlights" />
                <ColorSwatch name="Sidebar Border" cssVar="sidebar-border" description="Sidebar dividers" />
                <ColorSwatch name="Sidebar Ring" cssVar="sidebar-ring" description="Sidebar focus ring" />
              </div>
            </CardContent>
          </Card>
        </Section>

        <Separator />

        {/* ═══ 2. TYPOGRAPHY ═══ */}
        <Section
          id="typography"
          icon={Type}
          title="Typography"
          description="Font families, responsive headings, and type scale"
        >
          {/* Font Families */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Font Families</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-mono">--font-sans (Inter) - Body text</p>
                <p className="text-2xl font-sans">
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-mono">--font-heading (Geist) - Headings</p>
                <p className="text-2xl font-[family-name:var(--font-heading)]">
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-mono">--font-mono (Fira Code) - Code</p>
                <p className="text-2xl font-mono">
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Responsive Headings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Responsive Headings</CardTitle>
              <CardDescription>
                Geist, semibold, with tight letter-spacing. Sizes step down on mobile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-mono">heading-xl (60px / 48px mobile)</p>
                <p className="heading-xl">Design System</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-mono">heading-lg (48px / 36px mobile)</p>
                <p className="heading-lg">Design System</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-mono">heading-md (36px / 30px mobile)</p>
                <p className="heading-md">Design System</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-mono">heading-sm (24px / 20px mobile)</p>
                <p className="heading-sm">Design System</p>
              </div>
            </CardContent>
          </Card>

          {/* Type Scale */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Type Scale</CardTitle>
              <CardDescription>
                Body text sizes using Inter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { cls: "text-xs", label: "xs (12px/16px)" },
                { cls: "text-sm", label: "sm (14px/20px)" },
                { cls: "text-base", label: "base (16px/24px)" },
                { cls: "text-lg", label: "lg (18px/28px)" },
                { cls: "text-xl", label: "xl (20px/28px)" },
                { cls: "text-2xl", label: "2xl (24px/32px)" },
                { cls: "text-3xl", label: "3xl (30px/36px)" },
              ].map((item) => (
                <div key={item.cls} className="flex items-baseline gap-4">
                  <span className="w-36 shrink-0 text-xs text-muted-foreground font-mono">
                    {item.label}
                  </span>
                  <span className={item.cls}>
                    The quick brown fox
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Font Weights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Font Weights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {[
                  { w: "font-thin", label: "Thin (100)" },
                  { w: "font-extralight", label: "Extralight (200)" },
                  { w: "font-light", label: "Light (300)" },
                  { w: "font-normal", label: "Normal (400)" },
                  { w: "font-medium", label: "Medium (500)" },
                  { w: "font-semibold", label: "Semibold (600)" },
                  { w: "font-bold", label: "Bold (700)" },
                  { w: "font-extrabold", label: "Extrabold (800)" },
                  { w: "font-black", label: "Black (900)" },
                ].map((item) => (
                  <div key={item.w} className="space-y-1">
                    <p className={`text-lg ${item.w}`}>Aa</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Section>

        <Separator />

        {/* ═══ 3. BUTTONS ═══ */}
        <Section
          id="buttons"
          icon={Box}
          title="Buttons"
          description="All button variants and sizes"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-3">Sizes</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon"><Check className="h-4 w-4" /></Button>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-3">States</p>
                <div className="flex flex-wrap gap-3">
                  <Button>Enabled</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Toggles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Toggles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Toggle aria-label="Bold">
                  <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Italic">
                  <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Underline">
                  <Underline className="h-4 w-4" />
                </Toggle>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Separator />

        {/* ═══ 4. CARDS ═══ */}
        <Section
          id="cards"
          icon={LayoutGrid}
          title="Cards"
          description="Card layouts and compositions"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Simple Card */}
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>
                  A basic card with header and content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cards use the <span className="font-mono text-xs">card</span> and{" "}
                  <span className="font-mono text-xs">card-foreground</span> tokens
                  for their surface and text colors.
                </p>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Revenue</CardDescription>
                <CardTitle className="text-3xl">$45,231.89</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>

            {/* Card with Footer */}
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Invite your team to collaborate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2">
                  {["LR", "JD", "AK", "SM"].map((initials) => (
                    <Avatar key={initials} className="border-2 border-background">
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  <Avatar className="border-2 border-background">
                    <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                      +3
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Invite People
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Section>

        <Separator />

        {/* ═══ 5. FORMS ═══ */}
        <Section
          id="forms"
          icon={FormInput}
          title="Form Components"
          description="Inputs, selects, checkboxes, and other form elements"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Text Inputs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Text Inputs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="laura@heystack.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled">Disabled</Label>
                  <Input id="disabled" placeholder="Can't type here" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Write something..." />
                </div>
              </CardContent>
            </Card>

            {/* Selection Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Selection Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Select</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="vite">Vite</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="remix">Remix</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Checkboxes</Label>
                  <div className="space-y-2">
                    {["Design tokens", "Components", "Dark mode"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Checkbox id={item.toLowerCase().replace(" ", "-")} />
                        <Label htmlFor={item.toLowerCase().replace(" ", "-")} className="font-normal">
                          {item}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Radio Group</Label>
                  <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="compact" id="compact" />
                      <Label htmlFor="compact" className="font-normal">Compact</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="comfortable" id="comfortable" />
                      <Label htmlFor="comfortable" className="font-normal">Comfortable</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="spacious" id="spacious" />
                      <Label htmlFor="spacious" className="font-normal">Spacious</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="font-normal">Enable notifications</Label>
                  <Switch id="notifications" />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Slider</Label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator />

        {/* ═══ 6. DATA DISPLAY ═══ */}
        <Section
          id="data-display"
          icon={Layers}
          title="Data Display"
          description="Tables, badges, accordions, tabs, and more"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Avatars */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Avatars</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">LR</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-secondary text-secondary-foreground">JD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-destructive text-destructive-foreground">AK</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-muted text-muted-foreground">SM</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tabs</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Overview content goes here. Tabs use the <span className="font-mono text-xs">muted</span> token
                    for the tab list background and <span className="font-mono text-xs">primary</span> for the active indicator.
                  </p>
                </TabsContent>
                <TabsContent value="analytics" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Analytics content would display charts and metrics here.
                  </p>
                </TabsContent>
                <TabsContent value="settings" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Settings content for configuration options.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Accordion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Accordion</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="tokens">
                  <AccordionTrigger>What are design tokens?</AccordionTrigger>
                  <AccordionContent>
                    Design tokens are the building blocks of a design system - named values
                    for colors, spacing, typography, and more. They ensure consistency
                    across your entire UI.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="semantic">
                  <AccordionTrigger>Why use semantic color names?</AccordionTrigger>
                  <AccordionContent>
                    Instead of using raw hex values like #86198F, you use names like
                    &ldquo;primary&rdquo;. This way, when you switch between light and dark mode (or
                    rebrand), you only change the token definition - not every component.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="responsive">
                  <AccordionTrigger>How do responsive headings work?</AccordionTrigger>
                  <AccordionContent>
                    Headings automatically scale down on smaller screens. For example,
                    heading-xl is 60px on desktop but drops to 48px on mobile. This is
                    handled by the CSS utilities in globals.css.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Table</CardTitle>
              <CardDescription>Token reference table</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Value (Light)</TableHead>
                    <TableHead className="text-right">Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { token: "primary", cat: "Color", val: "#86198F", usage: "Buttons, links" },
                    { token: "background", cat: "Color", val: "#FAFAF9", usage: "Page bg" },
                    { token: "heading-xl", cat: "Typography", val: "60px", usage: "Hero titles" },
                    { token: "spacing-6", cat: "Spacing", val: "24px", usage: "Container padding" },
                    { token: "radius-md", cat: "Radius", val: "8px", usage: "Default corners" },
                  ].map((row) => (
                    <TableRow key={row.token}>
                      <TableCell className="font-mono text-sm">{row.token}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{row.cat}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">{row.val}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{row.usage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Section>

        <Separator />

        {/* ═══ 7. FEEDBACK ═══ */}
        <Section
          id="feedback"
          icon={CircleAlert}
          title="Feedback"
          description="Alerts, progress, skeletons, and status indicators"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Alerts */}
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>
                  This is a default alert using the card surface colors.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <CircleAlert className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something went wrong. This alert uses the destructive token.
                </AlertDescription>
              </Alert>
            </div>

            {/* Progress & Skeleton */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Upload progress</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Skeleton</CardTitle>
                  <CardDescription>Loading placeholder states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        <Separator />

        {/* ═══ 8. CHART COLORS ═══ */}
        <Section
          id="charts"
          icon={BarChart3}
          title="Chart Colors"
          description="Visual preview of the data visualization palette"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Bar Chart Preview</CardTitle>
              <CardDescription>
                How chart tokens look in a data context
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-48">
                {[
                  { n: 1, h: "80%", label: "Purple" },
                  { n: 2, h: "65%", label: "Teal" },
                  { n: 3, h: "90%", label: "Cyan" },
                  { n: 4, h: "45%", label: "Amber" },
                  { n: 5, h: "70%", label: "Rose" },
                ].map((bar) => (
                  <div key={bar.n} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div
                      className="w-full rounded-t-md transition-all duration-500"
                      style={{
                        height: bar.h,
                        backgroundColor: `var(--chart-${bar.n})`,
                      }}
                    />
                    <span className="text-xs text-muted-foreground">{bar.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Donut Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                {/* Simple CSS donut */}
                <div
                  className="h-32 w-32 shrink-0 rounded-full"
                  style={{
                    background: `conic-gradient(
                      var(--chart-1) 0% 30%,
                      var(--chart-2) 30% 50%,
                      var(--chart-3) 50% 70%,
                      var(--chart-4) 70% 85%,
                      var(--chart-5) 85% 100%
                    )`,
                    mask: "radial-gradient(circle at center, transparent 40%, black 41%)",
                    WebkitMask: "radial-gradient(circle at center, transparent 40%, black 41%)",
                  }}
                />
                <div className="space-y-2">
                  {[
                    { n: 1, label: "Chart 1", pct: "30%" },
                    { n: 2, label: "Chart 2", pct: "20%" },
                    { n: 3, label: "Chart 3", pct: "20%" },
                    { n: 4, label: "Chart 4", pct: "15%" },
                    { n: 5, label: "Chart 5", pct: "15%" },
                  ].map((item) => (
                    <div key={item.n} className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-sm"
                        style={{ backgroundColor: `var(--chart-${item.n})` }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium ml-auto">{item.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Separator />

        {/* ═══ SPACING & RADIUS REFERENCE ═══ */}
        <Section
          id="spacing"
          icon={LayoutGrid}
          title="Spacing & Radius"
          description="Visual reference for spacing scale and border radius tokens"
        >
          {/* Radius */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Border Radius</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "xs", val: "2px" },
                  { name: "sm", val: "6px" },
                  { name: "md", val: "8px" },
                  { name: "lg", val: "10px" },
                  { name: "xl", val: "14px" },
                  { name: "2xl", val: "16px" },
                  { name: "3xl", val: "24px" },
                  { name: "4xl", val: "32px" },
                ].map((r) => (
                  <div key={r.name} className="flex flex-col items-center gap-2">
                    <div
                      className="h-16 w-16 bg-primary"
                      style={{ borderRadius: r.val }}
                    />
                    <div className="text-center">
                      <p className="text-xs font-medium">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Spacing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Spacing Scale</CardTitle>
              <CardDescription>
                Common spacing values from the token system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: "1", px: 4 },
                  { name: "2", px: 8 },
                  { name: "3", px: 12 },
                  { name: "4", px: 16 },
                  { name: "5", px: 20 },
                  { name: "6", px: 24 },
                  { name: "8", px: 32 },
                  { name: "10", px: 40 },
                  { name: "12", px: 48 },
                  { name: "16", px: 64 },
                  { name: "20", px: 80 },
                  { name: "24", px: 96 },
                ].map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="w-16 shrink-0 text-xs font-mono text-muted-foreground text-right">
                      {s.name} ({s.px}px)
                    </span>
                    <div
                      className="h-3 rounded-sm bg-primary/30"
                      style={{ width: `${Math.min(s.px * 2, 100)}%` }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* ─── Footer ─── */}
        <footer className="border-t border-border pt-8 pb-12 text-center">
          <p className="text-sm text-muted-foreground">
            HeyStack Design System Dashboard
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Built with shadcn/ui + Tailwind CSS + Next.js
          </p>
        </footer>
      </main>
    </div>
  );
}
