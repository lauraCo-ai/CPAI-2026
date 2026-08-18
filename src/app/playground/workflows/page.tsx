"use client";

/**
 * Playground / Workflows — design exploration for the Pod 4 Workflow
 * Platform brief: a user composes a workflow (ICP → audience → signal →
 * propose → approve & execute → observe), approves what it proposes,
 * and every execution is recorded, attributed and priced in credits.
 * All data below is illustrative sample content.
 */

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Target,
  Users,
  Radio,
  Sparkles,
  ShieldCheck,
  Eye,
  MoreHorizontal,
  Check,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Sample data                                                        */
/* ------------------------------------------------------------------ */

const stats = [
  { label: "Active workflows", value: "4" },
  { label: "Pending approvals", value: "12" },
  { label: "Executions · 30 days", value: "1,284" },
  { label: "Credits used · 30 days", value: "963" },
];

const backboneSteps = [
  { icon: Target, name: "Curate ICP", detail: "B2B SaaS revenue leaders" },
  { icon: Users, name: "Audience", detail: "Past connections · 1,204" },
  { icon: Radio, name: "Wait on signal", detail: "Job change detected" },
  { icon: Sparkles, name: "Propose action", detail: "Personalized message" },
  { icon: ShieldCheck, name: "Approve & execute", detail: "Ask me first" },
  { icon: Eye, name: "Observe", detail: "Replies feed back as signals" },
];

type Workflow = {
  name: string;
  signal: string;
  action: string;
  audience: string;
  approval: "Ask first" | "Auto";
  executions: number;
  status: "Active" | "Paused" | "Draft";
};

const workflows: Workflow[] = [
  { name: "Job-change re-engage", signal: "Job change detected", action: "Send message", audience: "Past connections", approval: "Ask first", executions: 214, status: "Active" },
  { name: "New-lead prospecting", signal: "New profile matches ICP", action: "Send invite", audience: "ICP: SaaS revenue leaders", approval: "Auto", executions: 862, status: "Active" },
  { name: "Warm intro on promotion", signal: "Promotion detected", action: "Engage with post", audience: "2nd-degree of customers", approval: "Ask first", executions: 96, status: "Active" },
  { name: "Silence nudge", signal: "No reply in 14 days", action: "Follow-up message", audience: "Open conversations", approval: "Ask first", executions: 112, status: "Paused" },
  { name: "Open-to-work outreach", signal: "Open to work", action: "Send invite", audience: "Past applicants", approval: "Ask first", executions: 0, status: "Draft" },
];

type Proposal = {
  prospect: string;
  initials: string;
  role: string;
  signal: string;
  workflow: string;
  action: string;
  preview: string;
  credits: number;
};

const proposals: Proposal[] = [
  {
    prospect: "Maria Duarte",
    initials: "MD",
    role: "VP Marketing · Shopify",
    signal: "Promoted to VP Marketing",
    workflow: "Warm intro on promotion",
    action: "Engage with post",
    preview: "Congratulate on the promotion and reference her post on retention benchmarks.",
    credits: 1,
  },
  {
    prospect: "James Okafor",
    initials: "JO",
    role: "Head of Sales · Klue",
    signal: "Job change — joined Klue",
    workflow: "Job-change re-engage",
    action: "Send message",
    preview: "Congrats on the new role at Klue — worth reconnecting now that you're building the team?",
    credits: 1,
  },
  {
    prospect: "Priya Natarajan",
    initials: "PN",
    role: "Director of RevOps · Loopio",
    signal: "New profile matches ICP",
    workflow: "New-lead prospecting",
    action: "Send invite",
    preview: "Invite with note referencing shared connection Gus Molina.",
    credits: 1,
  },
];

type LedgerEntry = {
  time: string;
  type: "invite_sent" | "message_sent" | "engagement";
  prospect: string;
  account: string;
  workflow: string;
  credits: number;
  outcome: string;
};

const ledger: LedgerEntry[] = [
  { time: "Today 09:41", type: "message_sent", prospect: "James Okafor", account: "Klue", workflow: "Job-change re-engage", credits: 1, outcome: "Replied" },
  { time: "Today 09:12", type: "invite_sent", prospect: "Priya Natarajan", account: "Loopio", workflow: "New-lead prospecting", credits: 1, outcome: "Accepted" },
  { time: "Today 08:55", type: "engagement", prospect: "Maria Duarte", account: "Shopify", workflow: "Warm intro on promotion", credits: 1, outcome: "—" },
  { time: "Yesterday 17:20", type: "invite_sent", prospect: "Tom Becker", account: "Miro", workflow: "New-lead prospecting", credits: 1, outcome: "Pending" },
  { time: "Yesterday 16:02", type: "message_sent", prospect: "Ana Silva", account: "Pipedrive", workflow: "Silence nudge", credits: 1, outcome: "—" },
  { time: "Yesterday 11:48", type: "message_sent", prospect: "Kenji Mori", account: "Notion", workflow: "Job-change re-engage", credits: 1, outcome: "Meeting booked" },
];

const actionTypeLabel: Record<LedgerEntry["type"], string> = {
  invite_sent: "Invite",
  message_sent: "Message",
  engagement: "Engagement",
};

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: Workflow["status"] }) {
  if (status === "Active") return <Badge>Active</Badge>;
  if (status === "Paused") return <Badge variant="secondary">Paused</Badge>;
  return <Badge variant="outline">Draft</Badge>;
}

function OutcomeBadge({ outcome }: { outcome: string }) {
  if (outcome === "—" || outcome === "Pending") {
    return <span className="text-sm text-muted-foreground">{outcome}</span>;
  }
  return <Badge variant="secondary">{outcome}</Badge>;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function WorkflowsPage() {
  const [tab, setTab] = useState("workflows");

  return (
    <div className="mx-auto max-w-7xl container-px py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <Link
          href="/playground"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Playground
        </Link>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="heading-md">Workflows</h1>
            <p className="max-w-2xl text-muted-foreground">
              Compose a workflow, approve what it proposes, and see everything
              it executed — recorded, attributed and priced.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Compose Workflow
          </Button>
        </div>
      </div>

      {/* Stats — plain numbers; spacing does the grouping, no tile per metric */}
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-0.5">
            <p className="text-3xl font-semibold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Backbone pipeline */}
      <Card className="rounded-xl">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold">
                Job-change re-engage
              </CardTitle>
              <CardDescription>
                The backbone: every workflow is the same six steps.
              </CardDescription>
            </div>
            <StatusBadge status="Active" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {backboneSteps.map((step, index) => (
              <div key={step.name} className="relative">
                <div className="flex h-full flex-col gap-2 rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
                      <step.icon className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-tight">{step.name}</p>
                  <p className="text-xs text-muted-foreground">{step.detail}</p>
                </div>
                {index < backboneSteps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground lg:block" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Surfaces */}
      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="approvals">
            Approval Queue
            <Badge variant="secondary" className="ml-2">
              {proposals.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="ledger">Execution Ledger</TabsTrigger>
        </TabsList>

        {/* --- Workflows --- */}
        <TabsContent value="workflows">
          <Card className="rounded-xl">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Workflow</TableHead>
                    <TableHead>Signal</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Approval</TableHead>
                    <TableHead className="text-right">Executions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflows.map((workflow) => (
                    <TableRow key={workflow.name}>
                      <TableCell className="font-medium">
                        {workflow.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {workflow.signal}
                      </TableCell>
                      <TableCell>{workflow.action}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {workflow.audience}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{workflow.approval}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {workflow.executions.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={workflow.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Workflow actions">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>
                              {workflow.status === "Paused" ? "Resume" : "Pause"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Approval Queue --- */}
        <TabsContent value="approvals">
          <div className="space-y-3">
            {proposals.map((proposal) => (
              <Card key={proposal.prospect} className="rounded-xl">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="flex flex-1 items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{proposal.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium">
                            {proposal.prospect}
                          </p>
                          <span className="text-sm text-muted-foreground">
                            {proposal.role}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">{proposal.signal}</Badge>
                          <span className="text-xs text-muted-foreground">
                            via {proposal.workflow}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            {proposal.action}:
                          </span>{" "}
                          {proposal.preview}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center justify-between gap-3 lg:justify-end">
                      <span className="text-xs text-muted-foreground">
                        {proposal.credits} credit
                      </span>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <X className="h-3.5 w-3.5" />
                          Skip
                        </Button>
                        <Button size="sm">
                          <Check className="h-3.5 w-3.5" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <p className="text-xs text-muted-foreground">
              Approved actions execute immediately and land in the ledger.
              Signal monitoring is never metered — only actions taken on your
              behalf cost credits.
            </p>
          </div>
        </TabsContent>

        {/* --- Execution Ledger --- */}
        <TabsContent value="ledger">
          <Card className="rounded-xl">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Prospect</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Workflow</TableHead>
                    <TableHead className="text-right">Credits</TableHead>
                    <TableHead>Outcome</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ledger.map((entry) => (
                    <TableRow key={`${entry.time}-${entry.prospect}`}>
                      <TableCell className="text-muted-foreground">
                        {entry.time}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {actionTypeLabel[entry.type]}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {entry.prospect}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {entry.account}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {entry.workflow}
                      </TableCell>
                      <TableCell className="text-right">
                        {entry.credits}
                      </TableCell>
                      <TableCell>
                        <OutcomeBadge outcome={entry.outcome} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="mt-4 text-xs text-muted-foreground">
                Every execution carries an action type, an account and a credit
                cost. Outcomes are recorded on the same row — they govern, but
                are never priced.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
