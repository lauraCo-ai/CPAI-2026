"use client";

import React, { useState } from "react";

// UI component imports
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { Spinner } from "@/components/ui/spinner";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
  ItemSeparator,
} from "@/components/ui/item";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldContent,
} from "@/components/ui/field";
import { NativeSelect } from "@/components/ui/native-select";

// Lucide icons
import {
  Info,
  AlertTriangle,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronDown,
  Mail,
  Check,
  ChevronsUpDown,
  CalendarIcon,
  Search as SearchIcon,
  ArrowUpDown,
} from "lucide-react";

// Sonner
import { toast } from "sonner";

// date-fns
import { format } from "date-fns";

// Recharts
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

/* ------------------------------------------------------------------ */
/*  Not installed placeholder                                           */
/* ------------------------------------------------------------------ */
function NotInstalled() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <p className="text-muted-foreground text-sm">
        This component is a composite or requires additional installation.
      </p>
      <p className="text-xs text-muted-foreground">
        See the shadcn docs for usage examples.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Individual demos                                                    */
/* ------------------------------------------------------------------ */

function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="q1">
        <AccordionTrigger>What is HeyStack?</AccordionTrigger>
        <AccordionContent>
          HeyStack is a modern design system built with semantic tokens,
          responsive typography, and shadcn/ui components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="q2">
        <AccordionTrigger>How are tokens organized?</AccordionTrigger>
        <AccordionContent>
          Tokens are organized into semantic color tokens, typography scales,
          spacing scales, and responsive breakpoints.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="q3">
        <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
        <AccordionContent>
          Yes. All semantic color tokens have light and dark variants. Dark mode
          is activated by adding the &quot;dark&quot; class to the HTML element.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function AlertDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Your account has been created successfully. You can now access all
          features.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again or contact support.
        </AlertDescription>
      </Alert>
    </div>
  );
}

function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function AspectRatioDemo() {
  return (
    <div className="w-full max-w-sm">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-muted text-muted-foreground text-sm">
          16 / 9
        </div>
      </AspectRatio>
    </div>
  );
}

function AvatarDemo() {
  const items = [
    { initials: "SD", size: "h-8 w-8" },
    { initials: "JL", size: "h-10 w-10" },
    { initials: "IN", size: "h-12 w-12" },
    { initials: "OM", size: "h-10 w-10" },
    { initials: "GY", size: "h-8 w-8" },
  ];
  return (
    <div className="flex items-center gap-3">
      {items.map((item) => (
        <Avatar key={item.initials} className={item.size}>
          <AvatarFallback className="text-xs">{item.initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function ButtonDemo() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <p className="text-xs text-muted-foreground mb-3">Variants</p>
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3">Sizes</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Mail">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3">Disabled</p>
        <div className="flex flex-wrap gap-2">
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
  );
}

function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="flex items-center justify-center">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-xl border border-border"
      />
    </div>
  );
}

function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Notification</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          You have a new message from your team. Click below to read it.
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm">
          Dismiss
        </Button>
        <Button size="sm">Read now</Button>
      </CardFooter>
    </Card>
  );
}

function CarouselDemo() {
  const colors = [
    "bg-chart-1",
    "bg-chart-2",
    "bg-chart-3",
    "bg-chart-4",
    "bg-chart-5",
  ];
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {colors.map((color, i) => (
          <CarouselItem key={i}>
            <div
              className={`flex h-40 items-center justify-center rounded-xl ${color} text-white font-semibold text-xl`}
            >
              {i + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

const chartData = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
  { month: "Mar", value: 237 },
  { month: "Apr", value: 273 },
  { month: "May", value: 209 },
  { month: "Jun", value: 314 },
];

const chartConfig: ChartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)",
  },
};

function ChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-52 w-full">
      <AreaChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--color-value)"
          fill="var(--color-value)"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ChartContainer>
  );
}

function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-3">
      {["Notifications", "Marketing emails", "Product updates"].map((label) => (
        <div key={label} className="flex items-center gap-2">
          <Checkbox id={`cb-${label}`} defaultChecked={label === "Notifications"} />
          <Label htmlFor={`cb-${label}`} className="text-sm font-normal">
            {label}
          </Label>
        </div>
      ))}
    </div>
  );
}

function CollapsibleDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-xs space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Starred repositories</p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-lg border border-border px-4 py-3 text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-lg border border-border px-4 py-3 text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-lg border border-border px-4 py-3 text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function CommandDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Command Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <div className="w-full max-w-sm">
        <Command className="rounded-xl border border-border">
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Components">
              <CommandItem>Button</CommandItem>
              <CommandItem>Card</CommandItem>
              <CommandItem>Dialog</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
}

function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex h-32 w-64 items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground select-none">
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Cut</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Sofia Davis" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@sofia" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>
            Manage your account settings and preferences.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 py-2">
          <p className="text-sm text-muted-foreground">
            Drawer content goes here. You can put any content inside.
          </p>
        </div>
        <DrawerFooter>
          <Button>Save</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Options <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@sofia</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-semibold">Sofia Davis</p>
            <p className="text-xs text-muted-foreground">
              Designer & developer. Building HeyStack UI.
            </p>
            <p className="text-xs text-muted-foreground">Joined April 2024</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function InputDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <Input placeholder="Default input" />
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Email address" className="pl-9" />
      </div>
      <Input placeholder="Disabled input" disabled />
      <Input type="password" placeholder="Password" />
    </div>
  );
}

function InputOTPDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col items-center gap-4">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      {value && (
        <p className="text-sm text-muted-foreground">
          Value: <span className="font-medium text-foreground">{value}</span>
        </p>
      )}
    </div>
  );
}

function LabelDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="label-email">Email</Label>
        <Input id="label-email" placeholder="you@example.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="label-name">Full name</Label>
        <Input id="label-name" placeholder="Sofia Davis" />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="label-terms" />
        <Label htmlFor="label-terms" className="text-sm font-normal">
          Accept terms and conditions
        </Label>
      </div>
    </div>
  );
}

function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Tab</MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Save</MenubarItem>
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Zoom In</MenubarItem>
          <MenubarItem>Zoom Out</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Fullscreen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-64">
              <li>
                <NavigationMenuLink asChild>
                  <a href="#" className="block rounded-md p-3 hover:bg-muted">
                    <p className="text-sm font-semibold">Introduction</p>
                    <p className="text-xs text-muted-foreground">
                      An overview of HeyStack UI.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a href="#" className="block rounded-md p-3 hover:bg-muted">
                    <p className="text-sm font-semibold">Installation</p>
                    <p className="text-xs text-muted-foreground">
                      How to install and configure.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-64">
              <li>
                <NavigationMenuLink asChild>
                  <a href="#" className="block rounded-md p-3 hover:bg-muted">
                    <p className="text-sm font-semibold">Button</p>
                    <p className="text-xs text-muted-foreground">
                      Interactive button component.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a href="#" className="block rounded-md p-3 hover:bg-muted">
                    <p className="text-sm font-semibold">Card</p>
                    <p className="text-xs text-muted-foreground">
                      Card surface component.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <p className="text-sm font-medium">Dimensions</p>
          <p className="text-xs text-muted-foreground">
            Set the dimensions for the layer.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="pop-width" className="text-xs">Width</Label>
              <Input id="pop-width" defaultValue="100%" />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="pop-height" className="text-xs">Height</Label>
              <Input id="pop-height" defaultValue="auto" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ProgressDemo() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-sm">
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
          <span>Upload progress</span>
          <span className="text-muted-foreground">25%</span>
        </div>
        <Progress value={25} />
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
          <span>Storage used</span>
          <span className="text-muted-foreground">60%</span>
        </div>
        <Progress value={60} />
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
          <span>Sync complete</span>
          <span className="text-muted-foreground">90%</span>
        </div>
        <Progress value={90} />
      </div>
    </div>
  );
}

function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      {["Default", "Comfortable", "Compact"].map((opt) => (
        <div key={opt} className="flex items-center gap-2">
          <RadioGroupItem value={opt.toLowerCase()} id={`rg-${opt}`} />
          <Label htmlFor={`rg-${opt}`} className="text-sm font-normal">
            {opt}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function ResizableDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="w-full max-w-lg rounded-xl border border-border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-40 items-center justify-center p-4">
          <p className="text-sm text-muted-foreground">Panel One</p>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-40 items-center justify-center p-4">
          <p className="text-sm text-muted-foreground">Panel Two</p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function ScrollAreaDemo() {
  const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
  return (
    <ScrollArea className="h-48 w-48 rounded-xl border border-border">
      <div className="p-4">
        <p className="text-sm font-medium mb-3">Items</p>
        {items.map((item) => (
          <div
            key={item}
            className="py-1.5 text-sm text-muted-foreground border-b border-border last:border-0"
          >
            {item}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  );
}

function SeparatorDemo() {
  return (
    <div className="w-full max-w-xs space-y-4">
      <div>
        <p className="text-sm font-medium">Radix UI</p>
        <p className="text-xs text-muted-foreground">An open-source component library.</p>
      </div>
      <Separator />
      <div>
        <p className="text-sm font-medium">Separator</p>
        <p className="text-xs text-muted-foreground">Visually separates content.</p>
      </div>
      <Separator />
      <div>
        <p className="text-sm font-medium">Design System</p>
        <p className="text-xs text-muted-foreground">Built on top of Radix UI.</p>
      </div>
    </div>
  );
}

function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="sheet-name">Name</Label>
            <Input id="sheet-name" defaultValue="Sofia Davis" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="sheet-email">Email</Label>
            <Input id="sheet-email" defaultValue="sofia@example.com" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function SkeletonDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </CardContent>
    </Card>
  );
}

function SliderDemo() {
  const [value, setValue] = useState([50]);
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex justify-between text-sm">
        <span>Volume</span>
        <span className="text-muted-foreground">{value[0]}%</span>
      </div>
      <Slider
        value={value}
        onValueChange={setValue}
        max={100}
        step={1}
      />
    </div>
  );
}

function SonnerDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created.", {
            description: "Monday, April 20, 2026 at 9:00 AM",
          })
        }
      >
        Show toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Profile updated successfully.", {
            description: "Your changes have been saved.",
          })
        }
      >
        Success toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("Something went wrong.", {
            description: "Please try again later.",
          })
        }
      >
        Error toast
      </Button>
    </div>
  );
}

function SwitchDemo() {
  return (
    <div className="flex flex-col gap-4">
      {[
        { id: "sw-dark", label: "Dark mode" },
        { id: "sw-airplane", label: "Airplane mode" },
        { id: "sw-push", label: "Push notifications", defaultChecked: true },
      ].map(({ id, label, defaultChecked }) => (
        <div key={id} className="flex items-center justify-between w-56">
          <Label htmlFor={id} className="text-sm font-normal">
            {label}
          </Label>
          <Switch id={id} defaultChecked={defaultChecked} />
        </div>
      ))}
    </div>
  );
}

const invoices = [
  { id: "INV-001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: "INV-002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV-003", status: "Paid", method: "Bank Transfer", amount: "$350.00" },
  { id: "INV-004", status: "Failed", method: "Credit Card", amount: "$450.00" },
  { id: "INV-005", status: "Paid", method: "PayPal", amount: "$550.00" },
];

function TableDemo() {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.id}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    row.status === "Paid"
                      ? "secondary"
                      : row.status === "Failed"
                      ? "destructive"
                      : "outline"
                  }
                >
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell>{row.method}</TableCell>
              <TableCell className="text-right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList className="w-full">
        <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
        <TabsTrigger value="password" className="flex-1">Password</TabsTrigger>
        <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Manage your account settings and set your email preferences.
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
  );
}

function TextareaDemo() {
  const [value, setValue] = useState("");
  const max = 200;
  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      <Label htmlFor="ta-demo">Message</Label>
      <Textarea
        id="ta-demo"
        placeholder="Write your message here..."
        rows={4}
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, max))}
      />
      <p className="text-xs text-muted-foreground text-right">
        {value.length}/{max}
      </p>
    </div>
  );
}

function ToggleDemo() {
  return (
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
  );
}

function ToggleGroupDemo() {
  return (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This is a tooltip</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Info className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>More information</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

/* ------------------------------------------------------------------ */
/*  Button Group Demo                                                   */
/* ------------------------------------------------------------------ */

function ButtonGroupDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs text-muted-foreground mb-3">Horizontal group</p>
        <ButtonGroup>
          <Button variant="outline">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Underline className="h-4 w-4" />
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3">With text addon</p>
        <ButtonGroup>
          <ButtonGroupText>https://</ButtonGroupText>
          <Button variant="outline">example.com</Button>
        </ButtonGroup>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3">Vertical group</p>
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Top</Button>
          <Button variant="outline">Middle</Button>
          <Button variant="outline">Bottom</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Combobox Demo                                                       */
/* ------------------------------------------------------------------ */

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];

function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-52 justify-between"
        >
          {value
            ? frameworks.find((f) => f.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${value === framework.value ? "opacity-100" : "opacity-0"}`}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

/* ------------------------------------------------------------------ */
/*  Data Table Demo                                                     */
/* ------------------------------------------------------------------ */

const tableData = [
  { name: "Alice Johnson", email: "alice@example.com", status: "Active", role: "Admin" },
  { name: "Bob Smith", email: "bob@example.com", status: "Inactive", role: "Member" },
  { name: "Carol White", email: "carol@example.com", status: "Active", role: "Editor" },
  { name: "David Lee", email: "david@example.com", status: "Pending", role: "Member" },
  { name: "Eva Martinez", email: "eva@example.com", status: "Active", role: "Admin" },
];

function DataTableDemo() {
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sorted = [...tableData].sort((a, b) =>
    sortDir === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8"
                onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((row) => (
            <TableRow key={row.email}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell className="text-muted-foreground">{row.email}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    row.status === "Active"
                      ? "secondary"
                      : row.status === "Inactive"
                      ? "destructive"
                      : "outline"
                  }
                >
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell>{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Date Picker Demo                                                    */
/* ------------------------------------------------------------------ */

function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-52 justify-start text-left font-normal ${!date ? "text-muted-foreground" : ""}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

/* ------------------------------------------------------------------ */
/*  Empty Demo                                                          */
/* ------------------------------------------------------------------ */

function EmptyDemo() {
  return (
    <Empty className="border border-dashed border-border max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try adjusting your search or filters to find what you&apos;re looking for.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Clear search
        </Button>
      </EmptyContent>
    </Empty>
  );
}

/* ------------------------------------------------------------------ */
/*  Field Demo                                                          */
/* ------------------------------------------------------------------ */

function FieldDemo() {
  return (
    <FieldSet className="w-full max-w-md">
      <Field orientation="vertical">
        <FieldLabel htmlFor="field-name">Name</FieldLabel>
        <FieldContent>
          <Input id="field-name" placeholder="Sofia Davis" />
          <FieldDescription>Your full display name.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="vertical">
        <FieldLabel htmlFor="field-email">Email</FieldLabel>
        <FieldContent>
          <Input id="field-email" type="email" placeholder="sofia@example.com" />
          <FieldDescription>Used for login and notifications.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="vertical">
        <FieldLabel htmlFor="field-bio">Bio</FieldLabel>
        <FieldContent>
          <Textarea id="field-bio" placeholder="Tell us a little about yourself..." rows={3} />
          <FieldDescription>Max 200 characters.</FieldDescription>
        </FieldContent>
      </Field>
    </FieldSet>
  );
}

/* ------------------------------------------------------------------ */
/*  Input Group Demo                                                    */
/* ------------------------------------------------------------------ */

function InputGroupDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ig-username">Username</Label>
        <InputGroup>
          <InputGroupAddon align="inline-start">@</InputGroupAddon>
          <InputGroupInput id="ig-username" placeholder="username" />
        </InputGroup>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ig-search">Search</Label>
        <InputGroup>
          <InputGroupInput id="ig-search" placeholder="Search..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="xs">
              <SearchIcon className="h-3.5 w-3.5" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Item Demo                                                           */
/* ------------------------------------------------------------------ */

const itemUsers = [
  { name: "Alice Johnson", email: "alice@example.com", initials: "AJ" },
  { name: "Bob Smith", email: "bob@example.com", initials: "BS" },
  { name: "Carol White", email: "carol@example.com", initials: "CW" },
];

function ItemDemo() {
  return (
    <ItemGroup className="w-full max-w-md rounded-xl border border-border">
      {itemUsers.map((user, i) => (
        <React.Fragment key={user.email}>
          <Item variant="default">
            <ItemMedia variant="icon">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{user.name}</ItemTitle>
              <ItemDescription>{user.email}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="ghost" size="sm">View</Button>
            </ItemActions>
          </Item>
          {i < itemUsers.length - 1 && <ItemSeparator />}
        </React.Fragment>
      ))}
    </ItemGroup>
  );
}

/* ------------------------------------------------------------------ */
/*  Kbd Demo                                                            */
/* ------------------------------------------------------------------ */

function KbdDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-muted-foreground mb-3">Keyboard shortcuts</p>
        <div className="flex flex-col gap-2">
          {[
            { label: "Save", keys: ["⌘", "S"] },
            { label: "Copy", keys: ["⌘", "C"] },
            { label: "Undo", keys: ["⌘", "Z"] },
          ].map(({ label, keys }) => (
            <div key={label} className="flex items-center justify-between w-48">
              <span className="text-sm">{label}</span>
              <KbdGroup>
                {keys.map((key) => (
                  <Kbd key={key}>{key}</Kbd>
                ))}
              </KbdGroup>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">
          Press <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup> to open the command palette.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Native Select Demo                                                  */
/* ------------------------------------------------------------------ */

function NativeSelectDemo() {
  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      <Label htmlFor="ns-country">Country</Label>
      <NativeSelect id="ns-country" defaultValue="">
        <option value="" disabled>Select a country</option>
        <option value="us">United States</option>
        <option value="gb">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
        <option value="de">Germany</option>
      </NativeSelect>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar Demo                                                        */
/* ------------------------------------------------------------------ */

function SidebarDemo() {
  return (
    <div className="flex h-64 w-56 flex-col rounded-xl border border-border bg-sidebar text-sidebar-foreground overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-sidebar-border">
        <div className="h-6 w-6 rounded bg-primary" />
        <span className="text-sm font-semibold">HeyStack</span>
      </div>
      <div className="flex-1 px-2 py-2 space-y-1">
        {["Dashboard", "Design System", "Settings"].map((item) => (
          <div
            key={item}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm cursor-pointer ${
              item === "Dashboard"
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            }`}
          >
            <div className="h-4 w-4 rounded-sm bg-current opacity-50" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Spinner Demo                                                        */
/* ------------------------------------------------------------------ */

function SpinnerDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-muted-foreground mb-3">Sizes</p>
        <div className="flex items-center gap-6">
          <Spinner className="size-4" />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3">With labels</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner className="size-4" />
            Loading...
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner className="size-4" />
            Processing...
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner className="size-4" />
            Please wait...
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

const demoMap: Record<string, React.FC> = {
  accordion: AccordionDemo,
  alert: AlertDemo,
  "alert-dialog": AlertDialogDemo,
  "aspect-ratio": AspectRatioDemo,
  avatar: AvatarDemo,
  badge: BadgeDemo,
  breadcrumb: BreadcrumbDemo,
  button: ButtonDemo,
  "button-group": ButtonGroupDemo,
  calendar: CalendarDemo,
  card: CardDemo,
  carousel: CarouselDemo,
  chart: ChartDemo,
  checkbox: CheckboxDemo,
  collapsible: CollapsibleDemo,
  combobox: ComboboxDemo,
  command: CommandDemo,
  "context-menu": ContextMenuDemo,
  "data-table": DataTableDemo,
  "date-picker": DatePickerDemo,
  dialog: DialogDemo,
  drawer: DrawerDemo,
  "dropdown-menu": DropdownMenuDemo,
  empty: EmptyDemo,
  field: FieldDemo,
  "hover-card": HoverCardDemo,
  input: InputDemo,
  "input-group": InputGroupDemo,
  "input-otp": InputOTPDemo,
  item: ItemDemo,
  kbd: KbdDemo,
  label: LabelDemo,
  menubar: MenubarDemo,
  "native-select": NativeSelectDemo,
  "navigation-menu": NavigationMenuDemo,
  pagination: PaginationDemo,
  popover: PopoverDemo,
  progress: ProgressDemo,
  "radio-group": RadioGroupDemo,
  resizable: ResizableDemo,
  "scroll-area": ScrollAreaDemo,
  select: SelectDemo,
  separator: SeparatorDemo,
  sheet: SheetDemo,
  sidebar: SidebarDemo,
  skeleton: SkeletonDemo,
  slider: SliderDemo,
  sonner: SonnerDemo,
  spinner: SpinnerDemo,
  switch: SwitchDemo,
  table: TableDemo,
  tabs: TabsDemo,
  textarea: TextareaDemo,
  toggle: ToggleDemo,
  "toggle-group": ToggleGroupDemo,
  tooltip: TooltipDemo,
};

export function ComponentDemo({ slug }: { slug: string }) {
  const Demo = demoMap[slug];

  if (!Demo) {
    return <NotInstalled />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4">
      <Demo />
    </div>
  );
}
