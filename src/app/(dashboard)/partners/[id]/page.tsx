import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Phone,
  Mail,
  MapPin,
  Package,
  Percent,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getPartnerById } from "@/lib/queries/partners";
import { formatCurrency, formatPhone, getInitials } from "@/lib/utils";
import { PARTNER_TYPES } from "@/lib/constants";
import type { PartnerType, PartnerStatus } from "@/types/app.types";

export const metadata: Metadata = { title: "Perfil do Parceiro" };

interface PageProps {
  params: { id: string };
}

export default async function PartnerDetailPage({ params }: PageProps) {
  const partner = await getPartnerById(params.id);

  if (!partner) notFound();

  const status = partner.status as PartnerStatus;
  const type = partner.type as PartnerType;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/partners">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <Avatar className="h-14 w-14">
          <AvatarFallback className="bg-[#3B82F6] font-heading text-lg font-bold text-white">
            {getInitials(partner.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-bold">{partner.name}</h1>
            <Badge variant={status === "active" ? "success" : "secondary"}>
              {status === "active" ? "Activo" : status === "pending" ? "Pendente" : "Inactivo"}
            </Badge>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{PARTNER_TYPES[type] ?? type}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#4CC88A]">{formatCurrency(partner.balance)}</p>
          <p className="text-xs text-muted-foreground">Saldo actual</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <Package className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
              <p className="text-2xl font-bold">{partner.total_deliveries}</p>
              <p className="text-xs text-muted-foreground">Entregas totais</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Percent className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
              <p className="text-2xl font-bold">
                {partner.commission_pct != null ? `${partner.commission_pct}%` : "—"}
              </p>
              <p className="text-xs text-muted-foreground">Comissão</p>
            </CardContent>
          </Card>
        </div>

        {/* Contacto */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="h-4 w-4" />
              Contacto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {partner.contact_name && (
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                  Responsável
                </p>
                <p className="font-semibold">{partner.contact_name}</p>
              </div>
            )}
            {partner.phone && (
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                  Telefone
                </p>
                <p className="flex items-center gap-1 text-sm">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  {formatPhone(partner.phone)}
                </p>
              </div>
            )}
            {partner.email && (
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Email</p>
                <p className="flex items-center gap-1 text-sm">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  {partner.email}
                </p>
              </div>
            )}
            {partner.zone && (
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Zona</p>
                <p className="flex items-center gap-1 text-sm">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  {partner.zone}
                </p>
              </div>
            )}
            {!partner.contact_name && !partner.phone && !partner.email && !partner.zone && (
              <p className="text-sm text-muted-foreground">Sem dados de contacto</p>
            )}
          </CardContent>
        </Card>

        {/* Condições comerciais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Percent className="h-4 w-4" />
              Condições Comerciais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                  Tipo de comissão
                </p>
                <p className="text-sm">{partner.commission_type ?? "—"}</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                  Comissão
                </p>
                <p className="text-sm font-semibold">
                  {partner.commission_pct != null ? `${partner.commission_pct}%` : "—"}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                  Saldo actual
                </p>
                <p className="font-semibold text-[#4CC88A]">{formatCurrency(partner.balance)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notas */}
        {partner.notes && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" />
                Notas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{partner.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
