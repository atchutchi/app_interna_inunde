import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Bike,
  Phone,
  User,
  Calendar,
  CheckCircle2,
  XCircle,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getRiderById } from "@/lib/queries/riders";
import { formatDate, formatPhone, getInitials } from "@/lib/utils";
import type { RiderStatus } from "@/types/app.types";

export const metadata: Metadata = { title: "Perfil do Motoboy" };

interface PageProps {
  params: { id: string };
}

const STATUS_LABELS: Record<RiderStatus, string> = {
  active: "Activo",
  inactive: "Inactivo",
  suspended: "Suspenso",
};

export default async function RiderDetailPage({ params }: PageProps) {
  const rider = await getRiderById(params.id);

  if (!rider) notFound();

  const name = rider.profile?.full_name ?? "—";
  const status = rider.status as RiderStatus;
  const vehicle = [rider.vehicle_brand, rider.vehicle_type].filter(Boolean).join(" ");
  const successRate =
    rider.total_deliveries > 0
      ? Math.round((rider.completed_deliveries / rider.total_deliveries) * 100)
      : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/riders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <Avatar className="h-14 w-14">
          <AvatarFallback className="bg-[#4CC88A] font-heading text-lg font-bold text-white">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-bold">{name}</h1>
            <Badge variant={status === "active" ? "success" : "secondary"}>
              {STATUS_LABELS[status] ?? status}
            </Badge>
          </div>
          {rider.profile?.phone && (
            <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
              <Phone className="h-3 w-3" />
              {formatPhone(rider.profile.phone)}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <Package className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
              <p className="text-2xl font-bold">{rider.total_deliveries}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="mx-auto mb-2 h-5 w-5 text-green-500" />
              <p className="text-2xl font-bold text-green-600">{rider.completed_deliveries}</p>
              <p className="text-xs text-muted-foreground">Concluídas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <XCircle className="mx-auto mb-2 h-5 w-5 text-destructive" />
              <p className="text-2xl font-bold text-destructive">{rider.failed_deliveries}</p>
              <p className="text-xs text-muted-foreground">Falhadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Taxa de sucesso */}
        <Card className="flex items-center justify-center">
          <CardContent className="pt-6 text-center">
            <p className="text-4xl font-bold text-[#4CC88A]">
              {successRate != null ? `${successRate}%` : "—"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Taxa de sucesso</p>
          </CardContent>
        </Card>

        {/* Informação pessoal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4" />
              Informação Pessoal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Nome</p>
              <p className="font-semibold">{name}</p>
            </div>
            {rider.profile?.phone && (
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                  Telefone
                </p>
                <p className="text-sm">{formatPhone(rider.profile.phone)}</p>
              </div>
            )}
            {rider.profile?.department && (
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                  Departamento
                </p>
                <p className="text-sm">{rider.profile.department}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Veículo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bike className="h-4 w-4" />
              Veículo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Tipo</p>
                <p className="text-sm">{rider.vehicle_type}</p>
              </div>
              {rider.vehicle_brand && (
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                    Marca
                  </p>
                  <p className="text-sm">{rider.vehicle_brand}</p>
                </div>
              )}
              {rider.vehicle_plate && (
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                    Matrícula
                  </p>
                  <p className="font-mono text-sm font-semibold">{rider.vehicle_plate}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contrato */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4" />
              Contrato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                Data de contratação
              </p>
              <p className="text-sm">{formatDate(rider.hire_date)}</p>
            </div>
            {rider.notes && (
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Notas</p>
                <p className="text-sm">{rider.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
