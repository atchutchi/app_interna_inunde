"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  DollarSign,
  Package,
  PhoneCall,
  Bike,
  Users,
  FileText,
  Settings,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/finance", label: "Financeiro", icon: DollarSign },
  { href: "/operations/deliveries", label: "Operações", icon: Package },
  { href: "/call-center", label: "Call Center", icon: PhoneCall },
  { href: "/riders", label: "Motoboys", icon: Bike },
  { href: "/partners", label: "Parceiros", icon: Users },
  { href: "/hr/attendance", label: "RH", icon: Calendar },
  { href: "/reports", label: "Relatórios", icon: FileText },
];

const BOTTOM_NAV: NavItem[] = [
  { href: "/settings", label: "Definições", icon: Settings },
];

interface SidebarProps {
  userFullName?: string;
  userRole?: string;
  userAvatarUrl?: string;
}

export function Sidebar({ userFullName, userRole, userAvatarUrl }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r bg-[#1A1A2E] text-white sidebar-transition",
        collapsed ? "w-16" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center justify-between px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4CC88A]">
              <span className="font-heading text-xs font-bold text-white">IN</span>
            </div>
            <span className="font-heading text-sm font-bold tracking-wide">INUNDE OPS</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="mx-auto">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4CC88A]">
              <span className="font-heading text-xs font-bold text-white">IN</span>
            </div>
          </Link>
        )}
      </div>

      <Separator className="bg-white/10" />

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        <ul className="space-y-0.5 px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                    active
                      ? "bg-[#4CC88A] text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white",
                    collapsed && "justify-center px-2"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                  {!collapsed && item.badge && (
                    <span className="ml-auto rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Separator className="bg-white/10" />

      {/* Bottom nav */}
      <div className="px-2 py-2">
        {BOTTOM_NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                active
                  ? "bg-[#4CC88A] text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* User profile */}
      <Separator className="bg-white/10" />
      <div className={cn("flex items-center gap-3 p-3", collapsed && "justify-center")}>
        <Avatar className="h-8 w-8 shrink-0">
          {userAvatarUrl && <AvatarImage src={userAvatarUrl} />}
          <AvatarFallback className="bg-[#4CC88A] text-white text-xs">
            {getInitials(userFullName)}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">{userFullName ?? "—"}</p>
            <p className="truncate text-xs text-white/50 capitalize">{userRole ?? ""}</p>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[72px] z-10 h-6 w-6 rounded-full border border-white/20 bg-[#1A1A2E] text-white/70 hover:bg-[#1A1A2E] hover:text-white"
        aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>
    </aside>
  );
}
