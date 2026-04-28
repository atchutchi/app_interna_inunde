import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { User, Phone, Shield, Building2, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatPhone, getInitials } from "@/lib/utils";

export const metadata: Metadata = { title: "Perfil" };

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrador",
  manager: "Gestor",
  operator: "Operador",
  finance: "Financeiro",
  hr: "Recursos Humanos",
  motorbike: "Motoboy",
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, role, department, avatar_url, created_at, status")
    .eq("id", user.id)
    .single();

  const name = profile?.full_name ?? user.email ?? "—";
  const role = profile?.role ?? "—";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Perfil</h1>
        <p className="text-sm text-muted-foreground">As suas informações pessoais e de conta</p>
      </div>

      {/* Avatar + name */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-[#4CC88A] font-heading text-2xl font-bold text-white">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-heading text-xl font-bold">{name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Badge
                variant={profile?.status === "active" ? "success" : "secondary"}
                className="mt-2"
              >
                {profile?.status === "active" ? "Activo" : "Inactivo"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-4 w-4" />
            Informação Pessoal
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
              Nome completo
            </p>
            <p className="font-medium">{name}</p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Email</p>
            <p className="text-sm">{user.email}</p>
          </div>
          {profile?.phone && (
            <div>
              <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Telefone</p>
              <p className="flex items-center gap-1 text-sm">
                <Phone className="h-3 w-3 text-muted-foreground" />
                {formatPhone(profile.phone)}
              </p>
            </div>
          )}
          {profile?.department && (
            <div>
              <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                Departamento
              </p>
              <p className="flex items-center gap-1 text-sm">
                <Building2 className="h-3 w-3 text-muted-foreground" />
                {profile.department}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4" />
            Conta
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Função</p>
            <p className="font-medium">{ROLE_LABELS[role] ?? role}</p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
              Membro desde
            </p>
            <p className="flex items-center gap-1 text-sm">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              {profile?.created_at ? formatDate(profile.created_at) : "—"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
