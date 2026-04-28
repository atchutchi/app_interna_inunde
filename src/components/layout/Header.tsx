"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, LogOut, User, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileNav } from "@/components/layout/MobileNav";
import { getInitials } from "@/lib/utils";

const BREADCRUMB_MAP: Record<string, string> = {
  dashboard: "Dashboard",
  finance: "Financeiro",
  income: "Entradas",
  expenses: "Saídas",
  debts: "Dívidas",
  shareholders: "Capital dos Sócios",
  operations: "Operações",
  deliveries: "Entregas",
  "call-center": "Call Center",
  history: "Histórico",
  riders: "Motoboys",
  partners: "Parceiros",
  hr: "RH",
  attendance: "Assiduidade",
  reports: "Relatórios",
  settings: "Definições",
  users: "Utilizadores",
};

interface HeaderProps {
  userFullName?: string;
  userRole?: string;
  userAvatarUrl?: string;
  onCommandOpen?: () => void;
}

export function Header({ userFullName, userRole, userAvatarUrl, onCommandOpen }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((seg) => BREADCRUMB_MAP[seg] ?? seg);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erro ao sair");
      return;
    }
    router.push("/login");
  }

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
      {/* Mobile nav trigger + breadcrumb */}
      <div className="flex items-center gap-3">
        <MobileNav />

        {/* Breadcrumb */}
        <nav className="hidden items-center gap-1 text-sm sm:flex">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
              <span
                className={
                  i === breadcrumbs.length - 1
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
                }
              >
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Cmd+K trigger */}
        <Button
          variant="outline"
          size="sm"
          onClick={onCommandOpen}
          className="hidden items-center gap-2 text-muted-foreground md:flex"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="text-xs">Pesquisar...</span>
          <kbd className="pointer-events-none ml-2 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Avatar className="h-8 w-8">
                {userAvatarUrl && <AvatarImage src={userAvatarUrl} />}
                <AvatarFallback className="bg-[#4CC88A] text-xs text-white">
                  {getInitials(userFullName)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="font-semibold">{userFullName ?? "—"}</p>
              <p className="text-xs font-normal capitalize text-muted-foreground">
                {userRole ?? ""}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <User className="mr-2 h-4 w-4" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
