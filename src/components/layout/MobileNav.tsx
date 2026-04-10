"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  LayoutDashboard,
  DollarSign,
  Package,
  PhoneCall,
  Bike,
  Users,
  FileText,
  Settings,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/finance", label: "Financeiro", icon: DollarSign },
  { href: "/operations/deliveries", label: "Operações", icon: Package },
  { href: "/call-center", label: "Call Center", icon: PhoneCall },
  { href: "/riders", label: "Motoboys", icon: Bike },
  { href: "/partners", label: "Parceiros", icon: Users },
  { href: "/hr/attendance", label: "RH", icon: Calendar },
  { href: "/reports", label: "Relatórios", icon: FileText },
  { href: "/settings", label: "Definições", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-[#1A1A2E] p-0 text-white">
        <SheetHeader className="px-4 py-4">
          <SheetTitle className="flex items-center gap-2 text-white">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4CC88A]">
              <span className="font-heading text-xs font-bold text-white">IN</span>
            </div>
            INUNDE OPS
          </SheetTitle>
        </SheetHeader>
        <Separator className="bg-white/10" />
        <nav className="py-3">
          <ul className="space-y-0.5 px-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                      active
                        ? "bg-[#4CC88A] text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
