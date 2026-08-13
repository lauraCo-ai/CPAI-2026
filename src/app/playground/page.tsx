"use client";

/**
 * Playground — scratch space for composing CoPilot-styled screens
 * out of the design system. Replace or extend anything here freely;
 * nothing outside this page depends on it.
 */

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Workflow, ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Sample data — mirrors the CoPilot Campaigns screen                 */
/* ------------------------------------------------------------------ */

type Campaign = {
  teamMember: string;
  name: string;
  type: string;
  invitesSent: number;
  connectionRate: number;
  replyRate: number;
  status: "Active" | "Draft" | "Inactive";
};

const campaigns: Campaign[] = [
  { teamMember: "Ariadna Franco", name: "Manual TEST 2", type: "Prospecting", invitesSent: 0, connectionRate: 0, replyRate: 0, status: "Active" },
  { teamMember: "Danilo Paz", name: "Nexxus", type: "Prospecting", invitesSent: 0, connectionRate: 0, replyRate: 0, status: "Active" },
  { teamMember: "Danilo Paz", name: "CoPilot AI PR", type: "Prospecting", invitesSent: 0, connectionRate: 0, replyRate: 0, status: "Active" },
  { teamMember: "Gus Molina", name: "Marketing - Manual Mode", type: "Prospecting", invitesSent: 83, connectionRate: 34.9, replyRate: 37.9, status: "Active" },
  { teamMember: "Gus Molina", name: "SAAS - Manual Mode", type: "Prospecting", invitesSent: 115, connectionRate: 23.5, replyRate: 22.2, status: "Active" },
  { teamMember: "Gus Molina", name: "Sales - Agent-Managed Mode", type: "Prospecting", invitesSent: 120, connectionRate: 24.2, replyRate: 13.8, status: "Active" },
  { teamMember: "Gus Molina", name: "LION - Manual Mode", type: "Prospecting", invitesSent: 121, connectionRate: 25.6, replyRate: 41.9, status: "Active" },
];

/** Colour-code a rate against a benchmark, like the CoPilot table. */
function RateBadge({ value }: { value: number }) {
  const variant =
    value === 0 ? "destructive" : value >= 20 ? "default" : "secondary";
  return <Badge variant={variant}>{value}%</Badge>;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PlaygroundPage() {
  const [tab, setTab] = useState("active");

  return (
    <div className="mx-auto max-w-7xl container-px py-10 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="heading-md">Playground</h1>
        <p className="text-muted-foreground">
          A scratch space for trying out compositions with the design system.
          Everything below is sample content — edit or delete freely.
        </p>
      </div>

      {/* Explorations */}
      <section className="space-y-4">
        <h2 className="heading-sm">Explorations</h2>
        <Link href="/playground/workflows" className="block max-w-md">
          <Card className="rounded-xl hover:border-primary/50 transition-colors">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary">
                <Workflow className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Workflows</p>
                <p className="text-sm text-muted-foreground">
                  Workflow platform — compose, approve, and track executions.
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Primary color sampler */}
      <section className="space-y-4">
        <h2 className="heading-sm">Primary color</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Badge>Badge</Badge>
          <div className="flex items-center gap-2">
            <Switch id="playground-switch" defaultChecked />
            <Label htmlFor="playground-switch">Switch</Label>
          </div>
        </div>
      </section>

      {/* Campaigns-style composition */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="heading-sm">Campaigns</h2>
          <Button>
            <Plus className="h-4 w-4" />
            Create Campaign
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search" className="pl-9" />
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Team Member" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ariadna">Ariadna Franco</SelectItem>
              <SelectItem value="danilo">Danilo Paz</SelectItem>
              <SelectItem value="gus">Gus Molina</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Campaign Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prospecting">Prospecting</SelectItem>
              <SelectItem value="nurture">Nurture</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="rounded-xl">
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="active">
                  Active
                  <Badge variant="secondary" className="ml-2">17</Badge>
                </TabsTrigger>
                <TabsTrigger value="draft">
                  Draft
                  <Badge variant="secondary" className="ml-2">166</Badge>
                </TabsTrigger>
                <TabsTrigger value="inactive">
                  Inactive
                  <Badge variant="secondary" className="ml-2">192</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="text-sm text-muted-foreground">Last 30 days</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Member</TableHead>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Invites Sent</TableHead>
                  <TableHead>Connection Rate</TableHead>
                  <TableHead>Reply Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={`${campaign.teamMember}-${campaign.name}`}>
                    <TableCell className="text-muted-foreground">
                      {campaign.teamMember}
                    </TableCell>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {campaign.type}
                    </TableCell>
                    <TableCell className="text-right">
                      {campaign.invitesSent}
                    </TableCell>
                    <TableCell>
                      <RateBadge value={campaign.connectionRate} />
                    </TableCell>
                    <TableCell>
                      <RateBadge value={campaign.replyRate} />
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {campaign.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm">Actions</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem>Pause</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
