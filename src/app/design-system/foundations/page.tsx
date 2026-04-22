"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Info,
  AlertTriangle,
  Mail,
  Lock,
  Bold,
  Italic,
  Underline,
  Heart,
  Star,
  Users,
  TrendingUp,
  DollarSign,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Section wrapper                                                    */
/* ------------------------------------------------------------------ */
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id}>
      <h2 className="heading-md mb-6">{title}</h2>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav links                                                          */
/* ------------------------------------------------------------------ */
const navItems = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "buttons", label: "Buttons" },
  { id: "cards", label: "Cards" },
  { id: "forms", label: "Forms" },
  { id: "data-display", label: "Data Display" },
  { id: "feedback", label: "Feedback" },
  { id: "charts", label: "Charts" },
  { id: "spacing-radius", label: "Spacing & Radius" },
];

/* ------------------------------------------------------------------ */
/*  Color swatch                                                       */
/* ------------------------------------------------------------------ */
function ColorSwatch({
  name,
  cssVar,
  tall,
}: {
  name: string;
  cssVar: string;
  tall?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`w-full rounded-lg border border-border ${tall ? "h-20" : "h-14"}`}
        style={{ backgroundColor: `var(--${cssVar})` }}
      />
      <p className="text-xs font-medium text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground">--{cssVar}</p>
    </div>
  );
}

/* ================================================================== */
/*  Design System Page                                                 */
/* ================================================================== */
export default function DesignSystemPage() {
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <TooltipProvider>
      <div className="mx-auto max-w-7xl container-px py-10 space-y-16">
        {/* ── Nav pills ── */}
        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ============================================================ */}
        {/*  1. Color Palette                                             */}
        {/* ============================================================ */}
        <Section id="colors" title="Color Palette">
          <div className="space-y-10">
            {/* Core */}
            <div>
              <h3 className="heading-sm mb-4">Core</h3>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                <ColorSwatch name="primary" cssVar="primary" />
                <ColorSwatch name="primary-foreground" cssVar="primary-foreground" />
                <ColorSwatch name="background" cssVar="background" />
                <ColorSwatch name="foreground" cssVar="foreground" />
                <ColorSwatch name="card" cssVar="card" />
                <ColorSwatch name="card-foreground" cssVar="card-foreground" />
              </div>
            </div>

            {/* Semantic */}
            <div>
              <h3 className="heading-sm mb-4">Semantic</h3>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                <ColorSwatch name="secondary" cssVar="secondary" />
                <ColorSwatch name="secondary-fg" cssVar="secondary-foreground" />
                <ColorSwatch name="muted" cssVar="muted" />
                <ColorSwatch name="muted-fg" cssVar="muted-foreground" />
                <ColorSwatch name="accent" cssVar="accent" />
                <ColorSwatch name="accent-fg" cssVar="accent-foreground" />
                <ColorSwatch name="destructive" cssVar="destructive" />
                <ColorSwatch name="destructive-fg" cssVar="destructive-foreground" />
                <ColorSwatch name="border" cssVar="border" />
                <ColorSwatch name="input" cssVar="input" />
                <ColorSwatch name="ring" cssVar="ring" />
                <ColorSwatch name="popover" cssVar="popover" />
              </div>
            </div>

            {/* Chart */}
            <div>
              <h3 className="heading-sm mb-4">Chart</h3>
              <div className="grid grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((n) => (
                  <ColorSwatch key={n} name={`chart-${n}`} cssVar={`chart-${n}`} tall />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <h3 className="heading-sm mb-4">Sidebar</h3>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                <ColorSwatch name="sidebar" cssVar="sidebar" />
                <ColorSwatch name="sidebar-foreground" cssVar="sidebar-foreground" />
                <ColorSwatch name="sidebar-primary" cssVar="sidebar-primary" />
                <ColorSwatch name="sidebar-accent" cssVar="sidebar-accent" />
                <ColorSwatch name="sidebar-border" cssVar="sidebar-border" />
                <ColorSwatch name="sidebar-ring" cssVar="sidebar-ring" />
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  2. Typography                                                */}
        {/* ============================================================ */}
        <Section id="typography" title="Typography">
          <div className="space-y-10">
            {/* Font families */}
            <div>
              <h3 className="heading-sm mb-4">Font Families</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-1">
                      Inter (sans) &mdash; Body text
                    </p>
                    <p className="font-sans text-lg">
                      The quick brown fox jumps over the lazy dog.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-1">
                      Geist (heading) &mdash; Headings
                    </p>
                    <p className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                      The quick brown fox jumps over the lazy dog.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-1">
                      Fira Code (mono) &mdash; Code
                    </p>
                    <p className="font-mono text-lg">
                      const greeting = &quot;Hello, world!&quot;;
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Responsive headings */}
            <div>
              <h3 className="heading-sm mb-4">Responsive Headings</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">heading-xl</p>
                  <p className="heading-xl">Heading Extra Large</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">heading-lg</p>
                  <p className="heading-lg">Heading Large</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">heading-md</p>
                  <p className="heading-md">Heading Medium</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">heading-sm</p>
                  <p className="heading-sm">Heading Small</p>
                </div>
              </div>
            </div>

            {/* Type scale */}
            <div>
              <h3 className="heading-sm mb-4">Type Scale</h3>
              <div className="space-y-3">
                {(
                  [
                    ["text-xs", "12/16"],
                    ["text-sm", "14/20"],
                    ["text-base", "16/24"],
                    ["text-lg", "18/28"],
                    ["text-xl", "20/28"],
                    ["text-2xl", "24/32"],
                    ["text-3xl", "30/36"],
                  ] as const
                ).map(([cls, size]) => (
                  <div key={cls} className="flex items-baseline gap-4">
                    <span className="w-24 shrink-0 text-xs text-muted-foreground">
                      {cls} ({size})
                    </span>
                    <span className={cls}>The quick brown fox</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Font weights */}
            <div>
              <h3 className="heading-sm mb-4">Font Weights</h3>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                {(
                  [
                    ["Thin", "font-thin"],
                    ["Extra Light", "font-extralight"],
                    ["Light", "font-light"],
                    ["Normal", "font-normal"],
                    ["Medium", "font-medium"],
                    ["Semibold", "font-semibold"],
                    ["Bold", "font-bold"],
                    ["Extra Bold", "font-extrabold"],
                    ["Black", "font-black"],
                  ] as const
                ).map(([label, cls]) => (
                  <div key={cls} className="text-center">
                    <p className={`text-lg ${cls}`}>Aa</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{cls}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  3. Buttons                                                   */}
        {/* ============================================================ */}
        <Section id="buttons" title="Buttons">
          <div className="space-y-8">
            {/* Variants */}
            <div>
              <h3 className="heading-sm mb-4">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="heading-sm mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Disabled */}
            <div>
              <h3 className="heading-sm mb-4">Disabled</h3>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button variant="secondary" disabled>
                  Disabled
                </Button>
                <Button variant="outline" disabled>
                  Disabled
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  4. Cards                                                     */}
        {/* ============================================================ */}
        <Section id="cards" title="Cards">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Simple card */}
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>
                  A basic card component with header, content, and footer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cards are surfaces that group related content and actions. They
                  support headers, footers, and any content within the body.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            {/* Stats card */}
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Total Revenue
                </CardDescription>
                <CardTitle className="text-3xl font-semibold">
                  $45,231.89
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span>+20.1% from last month</span>
                </div>
              </CardContent>
            </Card>

            {/* Team members card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members
                </CardTitle>
                <CardDescription>
                  Your project collaborators.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { initials: "SD", name: "Sofia Davis", email: "sofia@example.com" },
                  { initials: "JL", name: "Jackson Lee", email: "jackson@example.com" },
                  { initials: "IN", name: "Isabella Nguyen", email: "isabella@example.com" },
                ].map((m) => (
                  <div key={m.email} className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-xs">
                        {m.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {m.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{m.email}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  5. Form Components                                           */}
        {/* ============================================================ */}
        <Section id="forms" title="Form Components">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left column: text inputs */}
            <div className="space-y-6">
              <h3 className="heading-sm">Text Inputs</h3>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="disabled-input">Disabled</Label>
                <Input
                  id="disabled-input"
                  placeholder="Disabled input"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Textarea</Label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  rows={4}
                />
              </div>
            </div>

            {/* Right column: selection */}
            <div className="space-y-6">
              <h3 className="heading-sm">Selection</h3>

              <div className="space-y-2">
                <Label>Select</Label>
                <Select defaultValue="option-1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option-1">Option 1</SelectItem>
                    <SelectItem value="option-2">Option 2</SelectItem>
                    <SelectItem value="option-3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Checkboxes</Label>
                <div className="space-y-2">
                  {["Notifications", "Marketing emails", "Product updates"].map(
                    (label) => (
                      <div key={label} className="flex items-center gap-2">
                        <Checkbox id={label} />
                        <Label htmlFor={label} className="text-sm font-normal">
                          {label}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Radio Group</Label>
                <RadioGroup defaultValue="comfortable">
                  {["Default", "Comfortable", "Compact"].map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <RadioGroupItem
                        value={opt.toLowerCase()}
                        id={opt.toLowerCase()}
                      />
                      <Label
                        htmlFor={opt.toLowerCase()}
                        className="text-sm font-normal"
                      >
                        {opt}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="switch-demo">Dark mode</Label>
                <Switch id="switch-demo" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Slider</Label>
                  <span className="text-sm text-muted-foreground">
                    {sliderValue[0]}%
                  </span>
                </div>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  6. Data Display                                              */}
        {/* ============================================================ */}
        <Section id="data-display" title="Data Display">
          <div className="space-y-10">
            {/* Badges */}
            <div>
              <h3 className="heading-sm mb-4">Badges</h3>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>

            {/* Avatars */}
            <div>
              <h3 className="heading-sm mb-4">Avatars</h3>
              <div className="flex gap-3">
                {["SD", "JL", "IN", "OM", "GY"].map((initials) => (
                  <Avatar key={initials}>
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>

            {/* Toggle */}
            <div>
              <h3 className="heading-sm mb-4">Toggle</h3>
              <div className="flex gap-2">
                <Toggle aria-label="Toggle bold">
                  <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Toggle italic">
                  <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Toggle underline">
                  <Underline className="h-4 w-4" />
                </Toggle>
              </div>
            </div>

            {/* Tooltip */}
            <div>
              <h3 className="heading-sm mb-4">Tooltip</h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Tabs */}
            <div>
              <h3 className="heading-sm mb-4">Tabs</h3>
              <Tabs defaultValue="account" className="w-full">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        Manage your account settings and preferences.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="password">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        Change your password and security settings.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="settings">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        Configure your application preferences.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Accordion */}
            <div>
              <h3 className="heading-sm mb-4">Accordion</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is HeyStack?</AccordionTrigger>
                  <AccordionContent>
                    HeyStack is a modern design system built with semantic tokens,
                    responsive typography, and shadcn/ui components.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How are tokens organized?</AccordionTrigger>
                  <AccordionContent>
                    Tokens are organized into semantic color tokens, typography
                    scales, spacing scales, and responsive breakpoints, all defined
                    in the design system JSON file.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Does it support dark mode?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. All semantic color tokens have light and dark variants.
                    Dark mode is activated by adding the &quot;dark&quot; class to the HTML
                    element.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Table */}
            <div>
              <h3 className="heading-sm mb-4">Table</h3>
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Token</TableHead>
                        <TableHead>CSS Variable</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead className="text-right">Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          token: "primary",
                          css: "--primary",
                          usage: "Buttons, links, focus rings",
                          type: "Color",
                        },
                        {
                          token: "background",
                          css: "--background",
                          usage: "Page background",
                          type: "Color",
                        },
                        {
                          token: "heading-md",
                          css: ".heading-md",
                          usage: "Medium headings",
                          type: "Typography",
                        },
                        {
                          token: "container-px",
                          css: ".container-px",
                          usage: "Horizontal page padding",
                          type: "Spacing",
                        },
                        {
                          token: "radius-md",
                          css: "--radius-md",
                          usage: "Default border radius",
                          type: "Radius",
                        },
                      ].map((row) => (
                        <TableRow key={row.token}>
                          <TableCell className="font-medium">
                            {row.token}
                          </TableCell>
                          <TableCell className="font-mono text-sm text-muted-foreground">
                            {row.css}
                          </TableCell>
                          <TableCell>{row.usage}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline">{row.type}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  7. Feedback                                                  */}
        {/* ============================================================ */}
        <Section id="feedback" title="Feedback">
          <div className="space-y-8">
            {/* Alerts */}
            <div>
              <h3 className="heading-sm mb-4">Alerts</h3>
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    Your account has been created successfully. You can now access
                    all features.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Something went wrong. Please try again or contact support if the
                    issue persists.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            {/* Progress */}
            <div>
              <h3 className="heading-sm mb-4">Progress</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Upload progress</span>
                    <span className="text-muted-foreground">68%</span>
                  </div>
                  <Progress value={68} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage used</span>
                    <span className="text-muted-foreground">25%</span>
                  </div>
                  <Progress value={25} />
                </div>
              </div>
            </div>

            {/* Skeleton loaders */}
            <div>
              <h3 className="heading-sm mb-4">Skeleton</h3>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  8. Chart Colors                                              */}
        {/* ============================================================ */}
        <Section id="charts" title="Chart Colors">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Bar chart preview */}
            <Card>
              <CardHeader>
                <CardTitle>Bar Chart</CardTitle>
                <CardDescription>Monthly breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-3 h-48">
                  {[
                    { var: "chart-1", h: "80%" },
                    { var: "chart-2", h: "60%" },
                    { var: "chart-3", h: "90%" },
                    { var: "chart-4", h: "45%" },
                    { var: "chart-5", h: "70%" },
                  ].map((bar) => (
                    <div key={bar.var} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full rounded-md"
                        style={{
                          backgroundColor: `var(--${bar.var})`,
                          height: bar.h,
                        }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {bar.var.replace("chart-", "C")}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Donut chart preview */}
            <Card>
              <CardHeader>
                <CardTitle>Donut Chart</CardTitle>
                <CardDescription>Distribution overview</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="relative">
                  <div
                    className="h-48 w-48 rounded-full"
                    style={{
                      background: `conic-gradient(
                        var(--chart-1) 0% 25%,
                        var(--chart-2) 25% 45%,
                        var(--chart-3) 45% 65%,
                        var(--chart-4) 65% 82%,
                        var(--chart-5) 82% 100%
                      )`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-card" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-4 w-full justify-center">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className="flex items-center gap-1.5">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: `var(--chart-${n})` }}
                      />
                      <span className="text-xs text-muted-foreground">
                        Series {n}
                      </span>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  9. Spacing & Radius                                          */}
        {/* ============================================================ */}
        <Section id="spacing-radius" title="Spacing & Radius">
          <div className="space-y-10">
            {/* Border radius */}
            <div>
              <h3 className="heading-sm mb-4">Border Radius</h3>
              <div className="flex flex-wrap gap-6">
                {(
                  [
                    ["xs", "2px", "rounded-xs"],
                    ["sm", "6px", "rounded-sm"],
                    ["md", "8px", "rounded-md"],
                    ["lg", "10px", "rounded-lg"],
                    ["xl", "14px", "rounded-xl"],
                    ["2xl", "16px", "rounded-2xl"],
                    ["3xl", "24px", "rounded-3xl"],
                    ["4xl", "32px", "rounded-4xl"],
                  ] as const
                ).map(([label, size, cls]) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div
                      className={`h-16 w-16 bg-primary ${cls}`}
                    />
                    <p className="text-xs font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{size}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Spacing scale */}
            <div>
              <h3 className="heading-sm mb-4">Spacing Scale</h3>
              <div className="space-y-2">
                {(
                  [
                    ["1", "4px", "w-1"],
                    ["2", "8px", "w-2"],
                    ["3", "12px", "w-3"],
                    ["4", "16px", "w-4"],
                    ["5", "20px", "w-5"],
                    ["6", "24px", "w-6"],
                    ["8", "32px", "w-8"],
                    ["10", "40px", "w-10"],
                    ["12", "48px", "w-12"],
                    ["16", "64px", "w-16"],
                    ["20", "80px", "w-20"],
                    ["24", "96px", "w-24"],
                  ] as const
                ).map(([label, size, cls]) => (
                  <div key={label} className="flex items-center gap-4">
                    <span className="w-10 text-right text-xs text-muted-foreground shrink-0">
                      {label}
                    </span>
                    <div className={`h-3 ${cls} rounded-sm bg-primary`} />
                    <span className="text-xs text-muted-foreground">{size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </TooltipProvider>
  );
}
