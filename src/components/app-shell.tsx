"use client";

import { useState, useEffect } from "react";
import { Menu, Layers } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Desktop sidebar (lg+) */}
      <div className="hidden lg:block">
        <AppSidebar isDark={isDark} onToggleDark={setIsDark} />
      </div>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Layers className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold">HeyStack</span>
        </div>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-60 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <AppSidebar
              isDark={isDark}
              onToggleDark={setIsDark}
              variant="inline"
              onNavigate={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </header>

      <main className="lg:ml-60">{children}</main>
    </div>
  );
}
