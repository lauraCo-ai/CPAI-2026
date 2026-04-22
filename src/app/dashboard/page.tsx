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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";
import {
  Plus,
  Minus,
  Send,
  MoreHorizontal,
  Copy,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Card 1 — Total Revenue                                            */
/* ------------------------------------------------------------------ */
const revenueData = [
  { month: "Jan", revenue: 1800 },
  { month: "Feb", revenue: 2200 },
  { month: "Mar", revenue: 2800 },
  { month: "Apr", revenue: 2400 },
  { month: "May", revenue: 3200 },
  { month: "Jun", revenue: 3800 },
];

const revenueChartConfig = {
  revenue: { label: "Revenue", color: "var(--primary)" },
} satisfies ChartConfig;

function TotalRevenueCard() {
  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader className="pb-2">
        <CardDescription className="text-sm text-muted-foreground">
          Total Revenue
        </CardDescription>
        <CardTitle className="text-3xl font-semibold">$15,231.89</CardTitle>
        <p className="text-sm text-muted-foreground">
          +20.1% from last month
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={revenueChartConfig} className="aspect-auto h-20 w-full">
          <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-revenue)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--color-revenue)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              fill="url(#revGrad)"
              strokeWidth={2}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 2 — Upgrade Subscription                                     */
/* ------------------------------------------------------------------ */
function UpgradeSubscriptionCard() {
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [emailsChecked, setEmailsChecked] = useState(true);
  const [termsChecked, setTermsChecked] = useState(false);

  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Upgrade your subscription
        </CardTitle>
        <CardDescription>
          You are currently on the free plan. Upgrade to the pro plan to get
          access to all features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Name & Email */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input placeholder="First name" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input placeholder="example@email.c..." />
          </div>
        </div>

        {/* Card number */}
        <div className="space-y-2">
          <Label>Card number</Label>
          <Input placeholder="1234 5678 912..." />
        </div>

        {/* MM/YY & CVC */}
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="MM/YY" />
          <Input placeholder="CVC" />
        </div>

        {/* Plan selection */}
        <div className="space-y-2">
          <Label>Plan</Label>
          <p className="text-sm text-muted-foreground">
            Select the plan that best fits your needs.
          </p>
          <RadioGroup
            value={selectedPlan}
            onValueChange={setSelectedPlan}
            className="space-y-2"
          >
            <Label
              htmlFor="starter"
              className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                selectedPlan === "starter"
                  ? "border-primary"
                  : "border-border"
              }`}
            >
              <RadioGroupItem value="starter" id="starter" className="mt-0.5" />
              <div>
                <p className="text-sm font-medium">Starter Plan</p>
                <p className="text-sm text-muted-foreground font-normal">
                  Perfect for small businesses.
                </p>
              </div>
            </Label>
            <Label
              htmlFor="pro"
              className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                selectedPlan === "pro"
                  ? "border-primary"
                  : "border-border"
              }`}
            >
              <RadioGroupItem value="pro" id="pro" className="mt-0.5" />
              <div>
                <p className="text-sm font-medium">Pro Plan</p>
                <p className="text-sm text-muted-foreground font-normal">
                  More features and storage.
                </p>
              </div>
            </Label>
          </RadioGroup>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label>Notes</Label>
          <Textarea placeholder="Enter notes" />
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="terms"
              checked={termsChecked}
              onCheckedChange={(v) => setTermsChecked(v as boolean)}
            />
            <Label htmlFor="terms" className="text-sm font-normal">
              I agree to the terms and conditions
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="emails"
              checked={emailsChecked}
              onCheckedChange={(v) => setEmailsChecked(v as boolean)}
            />
            <Label htmlFor="emails" className="text-sm font-normal">
              Allow us to send you emails
            </Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Upgrade Plan</Button>
      </CardFooter>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 3 — Team Members                                             */
/* ------------------------------------------------------------------ */
function TeamMembersCard() {
  const members = [
    { initials: "SD", name: "Sofia Davis", email: "m@example.com", role: "Owner" },
    { initials: "JL", name: "Jackson Lee", email: "p@example.com", role: "Developer" },
    { initials: "IN", name: "Isabella Nguyen", email: "i@example.com", role: "Member" },
  ];

  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Team Members</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {members.map((m) => (
          <div key={m.email} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="text-xs">{m.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.email}</p>
              </div>
            </div>
            <Select defaultValue={m.role.toLowerCase()}>
              <SelectTrigger className="w-28 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 4 — Cookie Settings                                          */
/* ------------------------------------------------------------------ */
function CookieSettingsCard() {
  const [strictlyNecessary, setStrictlyNecessary] = useState(true);
  const [functional, setFunctional] = useState(false);

  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Cookie Settings</CardTitle>
        <CardDescription>
          Manage your cookie settings here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Strictly Necessary</Label>
            <p className="text-xs text-muted-foreground">
              These cookies are essential in order to use the website and its
              features.
            </p>
          </div>
          <Switch
            checked={strictlyNecessary}
            onCheckedChange={setStrictlyNecessary}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Functional Cookies</Label>
            <p className="text-xs text-muted-foreground">
              These cookies allow the website to provide personalized
              functionality.
            </p>
          </div>
          <Switch checked={functional} onCheckedChange={setFunctional} />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Save preferences
        </Button>
      </CardFooter>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 5 — Subscriptions                                            */
/* ------------------------------------------------------------------ */
const subscriptionData = [
  { month: "Jan", subs: 800 },
  { month: "Feb", subs: 1200 },
  { month: "Mar", subs: 1600 },
  { month: "Apr", subs: 1400 },
  { month: "May", subs: 1900 },
  { month: "Jun", subs: 2350 },
];

const subscriptionChartConfig = {
  subs: { label: "Subscriptions", color: "var(--primary)" },
} satisfies ChartConfig;

function SubscriptionsCard() {
  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardDescription className="text-sm text-muted-foreground">
            Subscriptions
          </CardDescription>
          <Button variant="ghost" size="sm" className="text-xs">
            View More
          </Button>
        </div>
        <CardTitle className="text-3xl font-semibold">+2350</CardTitle>
        <p className="text-sm text-muted-foreground">
          +180.1% from last month
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={subscriptionChartConfig} className="aspect-auto h-20 w-full">
          <AreaChart data={subscriptionData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-subs)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--color-subs)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="subs"
              stroke="var(--color-subs)"
              fill="url(#subGrad)"
              strokeWidth={2}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 6 — Create an account                                        */
/* ------------------------------------------------------------------ */
function CreateAccountCard() {
  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">
          Create an account
        </CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* OAuth buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </Button>
          <Button variant="outline" className="w-full">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Email & Password */}
        <div className="space-y-2">
          <Label>E-mail</Label>
          <Input placeholder="m@example.com" />
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <Input type="password" defaultValue="password123" />
        </div>
        <Button className="w-full">Create account</Button>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 7 — Chat                                                     */
/* ------------------------------------------------------------------ */
function ChatCard() {
  const messages = [
    { from: "them", text: "Hi, how can I help you today?" },
    { from: "me", text: "Hey, I'm having trouble with my account." },
    { from: "them", text: "What seems to be the problem?" },
    { from: "me", text: "I can't log in." },
  ];

  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="text-xs">SD</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-sm text-muted-foreground">m@example.com</p>
        </div>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                msg.from === "me"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center gap-2">
          <Input placeholder="Placeholder" className="flex-1" />
          <Button size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 8 — Report an Issue                                          */
/* ------------------------------------------------------------------ */
function ReportIssueCard() {
  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Report an issue
        </CardTitle>
        <CardDescription>
          What area are you having problems with?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Area</Label>
            <Select defaultValue="billing">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="account">Account</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Security Level</Label>
            <Select defaultValue="severity-2">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="severity-1">Severity 1</SelectItem>
                <SelectItem value="severity-2">Severity 2</SelectItem>
                <SelectItem value="severity-3">Severity 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Subject</Label>
          <Input placeholder="I need help with..." />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea placeholder="Please include all information relevant to your issue." />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Submit</Button>
      </CardFooter>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 9a — Mini Calendar                                           */
/* ------------------------------------------------------------------ */
function MiniCalendarCard() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 0, 10)
  );

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={new Date(2025, 0)}
      className="flex-1 rounded-xl border bg-card"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Card 9b — Move Goal                                               */
/* ------------------------------------------------------------------ */
const moveGoalData = [
  { day: "1", cal: 40 },
  { day: "2", cal: 55 },
  { day: "3", cal: 30 },
  { day: "4", cal: 65 },
  { day: "5", cal: 50 },
  { day: "6", cal: 70 },
  { day: "7", cal: 45 },
  { day: "8", cal: 60 },
  { day: "9", cal: 35 },
  { day: "10", cal: 75 },
  { day: "11", cal: 50 },
  { day: "12", cal: 65 },
  { day: "13", cal: 55 },
];

const moveGoalChartConfig = {
  cal: { label: "Calories", color: "var(--primary)" },
} satisfies ChartConfig;

function MoveGoalCard() {
  const [calories, setCalories] = useState(350);

  return (
    <Card className="rounded-xl shadow-none flex-1">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Move Goal</CardTitle>
        <CardDescription>Set your daily activity goal.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-6">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setCalories((c) => Math.max(0, c - 10))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="text-center">
            <p className="text-4xl font-semibold tracking-tight">{calories}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Calories/Day
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setCalories((c) => c + 10)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Bar chart */}
        <ChartContainer config={moveGoalChartConfig} className="aspect-auto h-16 w-full">
          <BarChart data={moveGoalData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Bar dataKey="cal" fill="var(--color-cal)" radius={[2, 2, 0, 0]} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Set Goal
        </Button>
      </CardFooter>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 10 — Exercise Minutes                                        */
/* ------------------------------------------------------------------ */
const exerciseData = [
  { month: "Jan", thisYear: 20, lastYear: 10 },
  { month: "Feb", thisYear: 35, lastYear: 15 },
  { month: "Mar", thisYear: 30, lastYear: 40 },
  { month: "Apr", thisYear: 60, lastYear: 30 },
  { month: "May", thisYear: 45, lastYear: 55 },
  { month: "Jun", thisYear: 70, lastYear: 50 },
];

const exerciseChartConfig = {
  thisYear: { label: "This Year", color: "var(--primary)" },
  lastYear: { label: "Last Year", color: "var(--muted-foreground)" },
} satisfies ChartConfig;

function ExerciseMinutesCard() {
  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Exercise Minutes
        </CardTitle>
        <CardDescription>
          Your exercise minutes are ahead of where you normally are.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={exerciseChartConfig} className="aspect-auto h-32 w-full">
          <LineChart data={exerciseData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Line
              type="monotone"
              dataKey="thisYear"
              stroke="var(--color-thisYear)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="lastYear"
              stroke="var(--color-lastYear)"
              strokeWidth={2}
              strokeDasharray="4 2"
              dot={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 11 — Payments Table                                          */
/* ------------------------------------------------------------------ */
function PaymentsCard() {
  const payments = [
    { status: "Success", email: "michael.mitc@exampl...", amount: "$630.44" },
    { status: "Success", email: "felicia.reid@example.c...", amount: "$767.50" },
    { status: "Processing", email: "georgia.young@exam...", amount: "$396.84" },
    { status: "Success", email: "alma.lawson@exampl...", amount: "$475.22" },
    { status: "Failed", email: "dolores.chambers@ex...", amount: "$275.43" },
  ];

  const statusVariant = (s: string) => {
    if (s === "Success") return "default";
    if (s === "Processing") return "secondary";
    return "destructive";
  };

  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Payments</CardTitle>
        <CardDescription>Manage your payments.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">
                <Checkbox />
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-8" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((p, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Badge
                    variant={statusVariant(p.status) as "default" | "secondary" | "destructive"}
                  >
                    {p.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {p.email}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {p.amount}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          0 of 5 row(s) selected.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 12 — Share Document                                          */
/* ------------------------------------------------------------------ */
function ShareDocumentCard() {
  const people = [
    { initials: "OM", name: "Olivia Martin", email: "m@example.com", role: "edit" },
    { initials: "IN", name: "Isabella Nguyen", email: "b@example.com", role: "view" },
    { initials: "SD", name: "Sofia Davis", email: "p@example.com", role: "view" },
  ];

  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Share this document
        </CardTitle>
        <CardDescription>
          Anyone with the link can view this document.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Link input */}
        <div className="flex gap-2">
          <Input
            readOnly
            defaultValue="http://example.com/link/to/document"
            className="flex-1"
          />
          <Button variant="secondary" className="shrink-0">
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-sm font-medium">People with access</h4>
          {people.map((p) => (
            <div
              key={p.email}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-xs">
                    {p.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{p.name}</p>
                  <p className="text-sm text-muted-foreground">{p.email}</p>
                </div>
              </div>
              <Select defaultValue={p.role}>
                <SelectTrigger className="w-28 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="edit">Can edit</SelectItem>
                  <SelectItem value="view">Can view</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* ================================================================== */
/*  Dashboard Page                                                     */
/* ================================================================== */
export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-6 md:px-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1.7fr]">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <TotalRevenueCard />
          <UpgradeSubscriptionCard />
          <TeamMembersCard />
          <CookieSettingsCard />
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <SubscriptionsCard />
          <CreateAccountCard />
          <ChatCard />
          <ReportIssueCard />
        </div>

        {/* Column 3 — spans full width on md, own column on xl */}
        <div className="flex flex-col gap-4 md:col-span-2 xl:col-span-1">
          {/* Calendar + Move Goal side by side */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <MiniCalendarCard />
            <MoveGoalCard />
          </div>
          <ExerciseMinutesCard />
          <PaymentsCard />
          <ShareDocumentCard />
        </div>
      </div>
    </div>
  );
}
