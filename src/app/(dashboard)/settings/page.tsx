import type { Metadata } from "next";
import { Settings, Users, Shield } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Definições" };

const SETTINGS_SECTIONS = [
  {
    href: "/settings/users",
    title: "Utilizadores",
    description: "Gerir membros da equipa, roles e acessos",
    icon: Users,
  },
  {
    href: "/settings",
    title: "Segurança",
    description: "Passwords, sessões e logs de acesso",
    icon: Shield,
  },
  {
    href: "/settings",
    title: "Geral",
    description: "Configurações da plataforma e tenant",
    icon: Settings,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Definições</h1>
        <p className="text-sm text-muted-foreground">Configurações da plataforma INUNDE OPS</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SETTINGS_SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.title} href={section.href}>
              <Card className="cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4CC88A]/10">
                      <Icon className="h-5 w-5 text-[#4CC88A]" />
                    </div>
                    <CardTitle className="text-base">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
