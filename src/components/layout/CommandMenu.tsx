"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  DollarSign,
  Package,
  PhoneCall,
  Bike,
  Users,
  FileText,
  Settings,
  Calendar,
  Plus,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const NAVIGATION_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, shortcut: "D" },
  { href: "/finance", label: "Financeiro", icon: DollarSign, shortcut: "F" },
  { href: "/operations/deliveries", label: "Entregas", icon: Package, shortcut: "E" },
  { href: "/call-center", label: "Call Center", icon: PhoneCall, shortcut: "C" },
  { href: "/riders", label: "Motoboys", icon: Bike },
  { href: "/partners", label: "Parceiros", icon: Users },
  { href: "/hr/attendance", label: "RH & Assiduidade", icon: Calendar },
  { href: "/reports", label: "Relatórios", icon: FileText },
  { href: "/settings", label: "Definições", icon: Settings },
];

const QUICK_ACTIONS = [
  { label: "Nova entrega", href: "/operations/deliveries", icon: Plus },
  { label: "Registar chamada", href: "/call-center", icon: Plus },
  { label: "Nova entrada financeira", href: "/finance/income", icon: Plus },
  { label: "Registar despesa", href: "/finance/expenses", icon: Plus },
];

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const router = useRouter();

  function navigate(href: string) {
    onOpenChange(false);
    router.push(href);
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Pesquisar páginas e acções..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

        <CommandGroup heading="Acções Rápidas">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <CommandItem key={action.label} onSelect={() => navigate(action.href)}>
                <Icon className="text-[#4CC88A]" />
                {action.label}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navegação">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem key={item.href} onSelect={() => navigate(item.href)}>
                <Icon />
                {item.label}
                {item.shortcut && <CommandShortcut>⌘{item.shortcut}</CommandShortcut>}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
