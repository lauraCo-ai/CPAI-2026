"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Palette, Sun, Moon, Layers } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/design-system", label: "Design System", icon: Palette },
];

interface AppSidebarProps {
  isDark: boolean;
  onToggleDark: (value: boolean) => void;
}

export function AppSidebar({ isDark, onToggleDark }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-sidebar-border bg-sidebar">
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
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
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
