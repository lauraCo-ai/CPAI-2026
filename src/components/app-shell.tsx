"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

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
      <AppSidebar isDark={isDark} onToggleDark={setIsDark} />
      <main className="ml-60">{children}</main>
    </div>
  );
}
