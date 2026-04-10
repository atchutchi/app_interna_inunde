"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CommandMenu } from "@/components/layout/CommandMenu";

interface DashboardShellProps {
  children: React.ReactNode;
  userFullName?: string;
  userRole?: string;
  userAvatarUrl?: string;
}

export function DashboardShell({
  children,
  userFullName,
  userRole,
  userAvatarUrl,
}: DashboardShellProps) {
  const [commandOpen, setCommandOpen] = React.useState(false);

  // Global Cmd+K / Ctrl+K shortcut
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex h-svh overflow-hidden">
      {/* Sidebar — hidden on mobile, visible on lg+ */}
      <div className="hidden lg:flex">
        <Sidebar
          userFullName={userFullName}
          userRole={userRole}
          userAvatarUrl={userAvatarUrl}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          userFullName={userFullName}
          userRole={userRole}
          userAvatarUrl={userAvatarUrl}
          onCommandOpen={() => setCommandOpen(true)}
        />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-6">{children}</main>
      </div>

      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}
