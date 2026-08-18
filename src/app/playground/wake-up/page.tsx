"use client";

/**
 * Playground / Wake up old opportunities — MVP design exploration.
 *
 * Source: Product Brief "Wake Up Old Opportunities — the MVP play"
 * (Confluence, EPD). Consumer patterns: Duolingo for setup (one
 * plain-language question at a time, smart defaults, impossible to feel
 * lost), DoorDash for following the work (glanceable status, no
 * analytics console). Approve-first is the only mode — nothing goes
 * out unseen.
 *
 * Layout follows the card de-clutter principles: one boundary
 * treatment per surface, spacing instead of dividers, one primary
 * action per card, shared facts hoisted out of repeated cards.
 *
 * All data below is illustrative sample content.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CalendarCheck,
  Moon,
  Pencil,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types & sample data                                                */
/* ------------------------------------------------------------------ */

type Warmth = "warm" | "quiet" | "dormant";

/** Human labels for the internal tiers — the reason carries the rank,
 *  the taxonomy never reaches the UI. */
const warmthChip: Record<Warmth, { label: string; variant: "default" | "secondary" | "outline" }> = {
  warm: { label: "Showed interest", variant: "default" },
  quiet: { label: "Went quiet", variant: "secondary" },
  dormant: { label: "Barely messaged", variant: "outline" },
};

type QueueCard = {
  id: string;
  name: string;
  initials: string;
  role: string;
  warmth: Warmth;
  chipOverride?: string;
  quietFor: string;
  whyNow: string;
  draft: string;
};

const initialQueue: QueueCard[] = [
  {
    id: "jordan",
    name: "Jordan Lee",
    initials: "JL",
    role: "Head of Partnerships · Beacon Analytics",
    warmth: "warm",
    quietFor: "3 weeks quiet",
    whyNow: "Asked about pricing, then silence — no reply to your last message.",
    draft:
      "Hi Jordan — you'd asked about pricing a few weeks back and I never heard where you landed. Happy to pick that up whenever it's useful; no rush from my side.",
  },
  {
    id: "priya",
    name: "Priya Sharma",
    initials: "PS",
    role: "VP Operations · Northgate Group",
    warmth: "warm",
    chipOverride: "Asked you to come back",
    quietFor: "It's June — her timing",
    whyNow: "She said “after our fiscal year ends in June” — five months ago, on her own timeline.",
    draft:
      "Hi Priya — you mentioned things would open up after your fiscal year wrapped in June. June it is! Is now a better moment to pick our conversation back up?",
  },
  {
    id: "marcus",
    name: "Marcus Webb",
    initials: "MW",
    role: "Sales Director · Fieldstone Software",
    warmth: "quiet",
    quietFor: "5 months quiet",
    whyNow: "You had a real back-and-forth in March, then it faded — no one said no.",
    draft:
      "Hi Marcus — our thread from March crossed my mind this week. How did the territory re-plan land? Curious how things settled on your side.",
  },
  {
    id: "sam",
    name: "Sam Okafor",
    initials: "SO",
    role: "Managing Partner · Okafor Advisory",
    warmth: "dormant",
    quietFor: "14 months quiet",
    whyNow: "Connected 14 months ago, messaged twice — the lightly-touched profile that still replies.",
    draft:
      "Hi Sam — we connected a while back and never got much of a chance to talk. No agenda here, just wanted to say hello and see how the year is treating the practice.",
  },
  {
    id: "dana",
    name: "Dana Whitfield",
    initials: "DW",
    role: "Director of RevOps · Larkspur",
    warmth: "quiet",
    quietFor: "6 weeks quiet",
    whyNow: "She replied twice in early July, then your follow-up went unanswered.",
    draft:
      "Hi Dana — picking our July thread back up. You were mid-way through the tooling review then; did the routing question ever get resolved?",
  },
];

/* Preview pool — what the compiled preview shows before enabling. */
const previewPool = [
  {
    warmth: "warm" as Warmth,
    count: 23,
    label: "Warm conversations that went quiet",
    detail: "Showed interest or named a date, then stalled. Always first.",
  },
  {
    warmth: "quiet" as Warmth,
    count: 141,
    label: "Conversations that faded out",
    detail: "Real back-and-forths that stopped. Least-messaged first.",
  },
  {
    warmth: "dormant" as Warmth,
    count: 367,
    label: "Connections you never really talked to",
    detail: "A couple a day at most, soft no-ask check-ins only.",
  },
];

/* Follow-along sample state */
const weekActivity = [
  { name: "Priya Sharma", event: "Replied an hour ago", state: "reply" as const },
  { name: "Tomás Rivera", event: "Meeting booked for Thursday 2pm", state: "meeting" as const },
  { name: "Jordan Lee", event: "Nudged Tuesday — no reply yet", state: "waiting" as const },
  { name: "Sam Okafor", event: "Nudged this morning", state: "waiting" as const },
];

const groupProgress = [
  { label: "Warm conversations", detail: "9 nudged · 4 replied" },
  { label: "Faded conversations", detail: "4 nudged · 1 replied" },
  { label: "Quiet connections", detail: "2 nudged · 1 replied" },
];

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

function WarmthBadge({ warmth, override }: { warmth: Warmth; override?: string }) {
  const chip = warmthChip[warmth];
  return <Badge variant={chip.variant}>{override ?? chip.label}</Badge>;
}

function AiMark() {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
      <Sparkles className="h-3 w-3 text-primary" aria-hidden />
      Drafted for you
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

function DesignNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto max-w-2xl text-xs leading-relaxed text-muted-foreground">
      <span className="font-semibold">Design note · </span>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage 1 — Discover (inside Today)                                  */
/* ------------------------------------------------------------------ */

function DiscoverStage({ onStart }: { onStart: () => void }) {
  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-2xl space-y-3">
        <SectionLabel>As it appears in the Today feed</SectionLabel>

        {/* The signal card: identity, why care, one action */}
        <Card className="rounded-xl">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Moon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <div className="min-w-0 flex-1 space-y-4">
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold">
                    18 conversations have gone quiet in the last month
                  </p>
                  <p className="text-sm text-muted-foreground">
                    They already replied to you once — warmer than anyone new.
                    One of them, Devin Shah, asked you to come back this
                    quarter. I can bring you a short list each morning with a
                    draft per person; nothing sends unless you approve it.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={onStart}>
                    Wake them up
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost">Not now</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <DesignNote>
        Entry is an outcome card, not a workflow noun (brief §4.2). The count
        and the named person come from the user's own data — evidence, not a
        pitch. One primary action, one quiet exit; the play never nags, it
        resurfaces only when the count grows.
      </DesignNote>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage 2 — Set up (Duolingo-style: one question at a time)          */
/* ------------------------------------------------------------------ */

const setupSteps = ["Quiet", "Off-limits", "Pace", "Preview"] as const;

function SetupStage({ onEnable }: { onEnable: () => void }) {
  const [step, setStep] = useState(0);
  const [warmWindow, setWarmWindow] = useState("1w");
  const [quietWindow, setQuietWindow] = useState("1m");
  const [dormantWindow, setDormantWindow] = useState("6m");
  const [pace, setPace] = useState("10");

  const next = () => setStep((s) => Math.min(s + 1, setupSteps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="space-y-6">
      <Card className="mx-auto max-w-2xl rounded-xl">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <CardDescription>
              Step {step + 1} of {setupSteps.length}
            </CardDescription>
            <CardDescription>Every answer is already filled in</CardDescription>
          </div>
          <Progress value={((step + 1) / setupSteps.length) * 100} aria-label="Setup progress" />
        </CardHeader>

        {/* ---- Step 1: what counts as quiet ---- */}
        {step === 0 && (
          <CardContent className="space-y-8">
            <div className="space-y-1.5">
              <h2 className="heading-sm">When should I say someone's gone quiet?</h2>
              <p className="text-sm text-muted-foreground">
                Suggested from how quickly your conversations usually cool off.
                Most people never change them.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0 space-y-0.5">
                  <p className="text-sm font-medium">A warm conversation stalls</p>
                  <p className="text-xs text-muted-foreground">
                    Someone showed interest, then nothing
                  </p>
                </div>
                <Select value={warmWindow} onValueChange={setWarmWindow}>
                  <SelectTrigger className="w-36" aria-label="Warm conversation window">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3d">after 3 days</SelectItem>
                    <SelectItem value="1w">after 1 week</SelectItem>
                    <SelectItem value="2w">after 2 weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0 space-y-0.5">
                  <p className="text-sm font-medium">Any conversation fades out</p>
                  <p className="text-xs text-muted-foreground">
                    You've messaged each other before, then it stopped
                  </p>
                </div>
                <Select value={quietWindow} onValueChange={setQuietWindow}>
                  <SelectTrigger className="w-36" aria-label="Faded conversation window">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2w">after 2 weeks</SelectItem>
                    <SelectItem value="1m">after 1 month</SelectItem>
                    <SelectItem value="2m">after 2 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0 space-y-0.5">
                  <p className="text-sm font-medium">A connection you never really talked to</p>
                  <p className="text-xs text-muted-foreground">
                    Connected, but the conversation never happened
                  </p>
                </div>
                <Select value={dormantWindow} onValueChange={setDormantWindow}>
                  <SelectTrigger className="w-36" aria-label="Quiet connection window">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3m">after 3 months</SelectItem>
                    <SelectItem value="6m">after 6 months</SelectItem>
                    <SelectItem value="12m">after a year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={next}>
                Looks right
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        )}

        {/* ---- Step 2: who is off-limits ---- */}
        {step === 1 && (
          <CardContent className="space-y-8">
            <div className="space-y-1.5">
              <h2 className="heading-sm">Who should I always leave alone?</h2>
              <p className="text-sm text-muted-foreground">
                These fences are already up — they come from choices you've
                made in the product. I re-check them before every single send.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Anyone who opted out or you dismissed</p>
                  <p className="text-xs text-muted-foreground">Always skipped · 41 people right now</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Anyone you've talked to in the last month</p>
                  <p className="text-xs text-muted-foreground">Always skipped · 45 people right now</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" aria-hidden />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-muted-foreground">
                    People in open deals, or already customers
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Needs your CRM, which isn't connected — everything else
                    works without it.{" "}
                    <button className="font-medium text-primary hover:underline">
                      Connect a CRM
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              One more promise:{" "}
              <span className="font-medium text-foreground">
                this only ever reaches people already in your network.
              </span>{" "}
              It never finds or contacts anyone new.
            </p>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={back}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button onClick={next}>
                Got it
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        )}

        {/* ---- Step 3: pace ---- */}
        {step === 2 && (
          <CardContent className="space-y-8">
            <div className="space-y-1.5">
              <h2 className="heading-sm">How long should your morning list be?</h2>
              <p className="text-sm text-muted-foreground">
                Warm conversations first, and at most a couple of long-quiet
                connections so they never crowd out the rest.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0 space-y-0.5">
                <p className="text-sm font-medium">People per day</p>
                <p className="text-xs text-muted-foreground">
                  {pace === "5" && "About 5 minutes of your morning"}
                  {pace === "10" && "About 10 minutes of your morning"}
                  {pace === "15" && "About 15 minutes of your morning"}
                </p>
              </div>
              <Select value={pace} onValueChange={setPace}>
                <SelectTrigger className="w-36" aria-label="People per day">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 people</SelectItem>
                  <SelectItem value="10">10 people</SelectItem>
                  <SelectItem value="15">15 people</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  Every message waits for you.
                </span>{" "}
                Nothing is ever sent until you've read it and approved it —
                and you can pause the whole thing in one tap.
              </p>
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={back}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button onClick={next}>
                Show me who you found
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        )}

        {/* ---- Step 4: compiled preview ---- */}
        {step === 3 && (
          <CardContent className="space-y-8">
            <div className="space-y-1.5">
              <h2 className="heading-sm">Here's who's gone quiet</h2>
              <p className="text-sm text-muted-foreground">
                531 people in your own network, ranked warmest first. Nothing
                below has been contacted — this is a preview, not a queue.
              </p>
            </div>

            <div className="space-y-5">
              {previewPool.map((group) => (
                <div key={group.label} className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-sm font-medium">{group.label}</p>
                    <p className="text-xs text-muted-foreground">{group.detail}</p>
                  </div>
                  <p className="shrink-0 text-2xl font-semibold">{group.count}</p>
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                86 people skipped: 41 opted out or dismissed, 45 talked to in
                the last month.
              </p>
            </div>

            {/* A real sample card, so “approve” is concrete before enabling */}
            <div className="space-y-2">
              <SectionLabel>The first card on tomorrow's list</SectionLabel>
              <Card className="rounded-xl">
                <CardContent className="space-y-3 pt-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">Jordan Lee</p>
                    <WarmthBadge warmth="warm" />
                    <span className="text-xs text-muted-foreground">3 weeks quiet</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Why now: asked about pricing, then silence.
                  </p>
                  <div className="rounded-md bg-muted/60 p-3">
                    <AiMark />
                    <p className="mt-1.5 text-sm leading-relaxed">{initialQueue[0].draft}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <Button className="w-full" size="lg" onClick={onEnable}>
                <CalendarCheck className="h-4 w-4" />
                Start waking them up
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                About 10 credits a day at this pace · pause any time · nothing
                sends without your approval
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      <DesignNote>
        Duolingo pattern: one question per screen, a smart default already
        chosen and explained, confirm-verbs instead of save-verbs. Rows are
        grouped by spacing, not boxes — the card border is the only container.
        Fences are facts, not toggles; the CRM fence is named as unavailable
        rather than hidden (brief §4.2·3). The preview shows the real first
        card so “approve-first” is concrete before committing.
      </DesignNote>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage 3 — The morning list (approve / edit / skip)                 */
/* ------------------------------------------------------------------ */

type CardStatus = "pending" | "sent" | "skipped";

function QueueStage() {
  const [statuses, setStatuses] = useState<Record<string, CardStatus>>(
    () => Object.fromEntries(initialQueue.map((c) => [c.id, "pending"]))
  );
  const [drafts, setDrafts] = useState<Record<string, string>>(
    () => Object.fromEntries(initialQueue.map((c) => [c.id, c.draft]))
  );
  const [editing, setEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const remaining = useMemo(
    () => initialQueue.filter((c) => statuses[c.id] === "pending"),
    [statuses]
  );
  const done = initialQueue.length - remaining.length;

  const setStatus = (id: string, status: CardStatus) =>
    setStatuses((s) => ({ ...s, [id]: status }));

  const approve = (card: QueueCard) => {
    setStatus(card.id, "sent");
    toast(`Sent to ${card.name.split(" ")[0]} — as you, on LinkedIn`, {
      description: "You have a few seconds to take it back.",
      action: {
        label: "Undo",
        onClick: () => setStatus(card.id, "pending"),
      },
    });
  };

  const skip = (card: QueueCard) => {
    setStatus(card.id, "skipped");
    toast(`Skipped ${card.name.split(" ")[0]}`, {
      description: "Noted — this shapes who I pick for you next.",
      action: {
        label: "Undo",
        onClick: () => setStatus(card.id, "pending"),
      },
    });
  };

  const startEdit = (card: QueueCard) => {
    setEditing(card.id);
    setEditText(drafts[card.id]);
  };

  const saveEdit = (id: string) => {
    setDrafts((d) => ({ ...d, [id]: editText }));
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-2xl space-y-5">
        {/* Queue header — session frame + the shared facts, stated once */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="heading-sm">This morning's list</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {done} of {initialQueue.length} handled
              </span>
              <Progress
                value={(done / initialQueue.length) * 100}
                className="w-28"
                aria-label="Queue progress"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {remaining.length === 0
              ? "All done — that's everyone for today."
              : `${remaining.length} ${remaining.length === 1 ? "person" : "people"}, warmest first · sends as you on LinkedIn · every send can be undone for a few seconds`}
          </p>
        </div>

        {remaining.length === 0 ? (
          <Card className="rounded-xl">
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-6 w-6 text-primary" aria-hidden />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold">That's everyone for today</p>
                <p className="text-sm text-muted-foreground">
                  Replies land in your inbox as they come. Tomorrow's list is
                  already forming — 8 people so far.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {remaining.map((card) => (
              <Card key={card.id} className="rounded-xl">
                <CardContent className="space-y-4 pt-6">
                  {/* Who — identity, warmth, recency: one scan line */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{card.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold">{card.name}</p>
                          <WarmthBadge warmth={card.warmth} override={card.chipOverride} />
                        </div>
                        <p className="text-xs text-muted-foreground">{card.role}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {card.quietFor}
                    </span>
                  </div>

                  {/* Why now — every card carries its reason */}
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Why now: </span>
                    {card.whyNow}
                  </p>

                  {/* The draft */}
                  {editing === card.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="min-h-32 text-sm leading-relaxed"
                        aria-label={`Edit message to ${card.name}`}
                        autoFocus
                      />
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setEditing(null)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => saveEdit(card.id)}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-md bg-muted/60 p-3">
                        <AiMark />
                        <p className="mt-1.5 text-sm leading-relaxed">{drafts[card.id]}</p>
                      </div>

                      {/* Actions — one bold primary, quiet secondaries, one spot */}
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => skip(card)}>
                          <X className="h-3.5 w-3.5" />
                          Skip
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => startEdit(card)}>
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Button>
                        <Button size="sm" onClick={() => approve(card)}>
                          <Check className="h-3.5 w-3.5" />
                          Send to {card.name.split(" ")[0]}
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <DesignNote>
        Each card answers exactly three questions — who is this, why now, what
        would I send — with one bold action; Skip and Edit stay quiet, grouped
        in one spot. The shared facts (sends as you, undoable) are stated once
        above the list instead of repeating on every card. The tier never
        appears as a number: “Showed interest” / “Went quiet” / “Barely
        messaged” carry the ranking in the user's own words (open question
        §12). Sending is undoable via toast; editing auto-grows with explicit
        Save / Cancel (inbox audit 2.2, 2.8).
      </DesignNote>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage 4 — Follow along (DoorDash status)                           */
/* ------------------------------------------------------------------ */

function FollowStage() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-2xl space-y-5">
        {/* The one live card — status, numbers, latest */}
        <Card className="rounded-xl">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold">
                  Wake up old opportunities
                </CardTitle>
                <CardDescription>
                  {paused
                    ? "Paused — nothing will be suggested or sent until you resume."
                    : "Running quietly. Your next list arrives tomorrow morning."}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="pause-play" className="text-sm text-muted-foreground">
                  {paused ? "Paused" : "Active"}
                </Label>
                <Switch
                  id="pause-play"
                  checked={!paused}
                  onCheckedChange={(v) => setPaused(!v)}
                  aria-label="Pause or resume the play"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-7">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-0.5">
                <p className="text-2xl font-semibold">15</p>
                <p className="text-xs text-muted-foreground">people nudged this week</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-semibold text-primary">6</p>
                <p className="text-xs text-muted-foreground">replies — waiting for you</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-semibold">1</p>
                <p className="text-xs text-muted-foreground">meeting booked</p>
              </div>
            </div>

            {/* Recent, in human sentences */}
            <div className="space-y-3">
              <SectionLabel>Lately</SectionLabel>
              {weekActivity.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-3">
                  <p className="min-w-0 truncate text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground"> — {item.event}</span>
                  </p>
                  {item.state === "reply" && (
                    <Button variant="outline" size="sm" className="shrink-0">
                      Open reply
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Per-group progress, still in plain words */}
            <div className="space-y-3">
              <SectionLabel>Who's warming up</SectionLabel>
              {groupProgress.map((group) => (
                <div key={group.label} className="flex items-center justify-between gap-3">
                  <p className="text-sm">{group.label}</p>
                  <p className="text-sm text-muted-foreground">{group.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-sm text-muted-foreground">
          Everything here is reversible: pause in one tap, skip anyone, and no
          message has ever gone out without your approval.
        </p>
      </div>

      <DesignNote>
        DoorDash pattern: one live card — status, three plain numbers, a short
        “lately” feed in sentences — and nothing else carded. Spacing and
        small labels do the grouping; no dividers, no stat tiles, no charts.
        The one accented number is the one that needs the user (replies
        waiting). Per-group progress keeps tiers reported separately (brief
        §9) without exposing tier numbers; the pause switch is the single
        control, where the eye lands first.
      </DesignNote>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const stages = [
  { value: "discover", label: "1 · Discover" },
  { value: "setup", label: "2 · Set up" },
  { value: "queue", label: "3 · Approve" },
  { value: "follow", label: "4 · Follow along" },
] as const;

export default function WakeUpPage() {
  const [stage, setStage] = useState<string>("discover");

  return (
    <div className="mx-auto max-w-7xl container-px py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <Link
          href="/playground"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Playground
        </Link>
        <div className="space-y-2">
          <h1 className="heading-md">Wake up old opportunities</h1>
          <p className="max-w-2xl text-muted-foreground">
            MVP design exploration for the Pod 4 play: the product watches for
            contacts going quiet, brings a short ranked list each morning with
            a draft per person, and sends nothing without approval. Walk the
            four moments below in order — each is interactive.
          </p>
        </div>
      </div>

      {/* Journey rail */}
      <Tabs value={stage} onValueChange={setStage} className="space-y-6">
        <TabsList>
          {stages.map((s) => (
            <TabsTrigger key={s.value} value={s.value}>
              {s.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {stage === "discover" && <DiscoverStage onStart={() => setStage("setup")} />}
        {stage === "setup" && <SetupStage onEnable={() => setStage("queue")} />}
        {stage === "queue" && <QueueStage />}
        {stage === "follow" && <FollowStage />}
      </Tabs>
    </div>
  );
}
