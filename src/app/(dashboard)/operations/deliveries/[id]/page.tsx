import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Phone,
  User,
  Bike,
  Building2,
  Calendar,
  Clock,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeliveryStatusBadge } from "@/components/operations/DeliveryStatusBadge";
import { getDeliveryById } from "@/lib/queries/deliveries";
import { formatCurrency, formatDateTime, formatPhone } from "@/lib/utils";
import { DELIVERY_SOURCES, VERTICALS } from "@/lib/constants";
import type { DeliveryStatus, DeliverySource, VerticalType } from "@/types/app.types";

export const metadata: Metadata = { title: "Detalhe da Entrega" };

interface PageProps {
  params: { id: string };
}

export default async function DeliveryDetailPage({ params }: PageProps) {
  const delivery = await getDeliveryById(params.id);

  if (!delivery) notFound();

  const vertical = VERTICALS[delivery.vertical as VerticalType];
  const source = DELIVERY_SOURCES[delivery.source as DeliverySource] ?? delivery.source;
  const rider = delivery.rider as {
    id: string;
    vehicle_plate: string | null;
    vehicle_type?: string;
    vehicle_brand?: string;
    profile: { full_name: string; phone?: string } | null;
  } | null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/operations/deliveries">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-bold">{delivery.order_number}</h1>
            <DeliveryStatusBadge status={delivery.status as DeliveryStatus} />
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {vertical?.label ?? delivery.vertical} · {source}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{formatCurrency(delivery.delivery_value)}</p>
          {delivery.commission != null && (
            <p className="text-sm text-muted-foreground">
              Comissão: {formatCurrency(delivery.commission)}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Cliente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4" />
              Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-semibold">{delivery.customer_name}</p>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <Phone className="h-3 w-3" />
                {formatPhone(delivery.customer_phone)}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Zona</p>
              <Badge variant="secondary" className="flex w-fit items-center gap-1">
                <MapPin className="h-3 w-3" />
                {delivery.delivery_zone}
              </Badge>
            </div>
            {delivery.delivery_address && (
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                  Endereço
                </p>
                <p className="text-sm">{delivery.delivery_address}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Motoboy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bike className="h-4 w-4" />
              Motoboy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {rider ? (
              <>
                <div>
                  <p className="font-semibold">{rider.profile?.full_name ?? "—"}</p>
                  {rider.profile?.phone && (
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {formatPhone(rider.profile.phone)}
                    </p>
                  )}
                </div>
                <div className="flex gap-6">
                  {rider.vehicle_plate && (
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                        Matrícula
                      </p>
                      <p className="font-mono text-sm font-semibold">{rider.vehicle_plate}</p>
                    </div>
                  )}
                  {rider.vehicle_brand && (
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                        Moto
                      </p>
                      <p className="text-sm">{rider.vehicle_brand}</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum motoboy atribuído</p>
            )}
          </CardContent>
        </Card>

        {/* Parceiro */}
        {delivery.partner && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="h-4 w-4" />
                Parceiro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{delivery.partner.name}</p>
            </CardContent>
          </Card>
        )}

        {/* Datas e Tempos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4" />
              Tempos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                  Pedido em
                </p>
                <p className="text-sm">{formatDateTime(delivery.requested_at)}</p>
              </div>
              {delivery.assigned_at && (
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                    Atribuído
                  </p>
                  <p className="text-sm">{formatDateTime(delivery.assigned_at)}</p>
                </div>
              )}
              {delivery.departed_at && (
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                    Saída
                  </p>
                  <p className="text-sm">{formatDateTime(delivery.departed_at)}</p>
                </div>
              )}
              {delivery.completed_at && (
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                    <Clock className="mr-1 inline h-3 w-3" />
                    Concluído
                  </p>
                  <p className="text-sm">{formatDateTime(delivery.completed_at)}</p>
                </div>
              )}
            </div>
            {delivery.distance_km != null && (
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                  Distância
                </p>
                <p className="text-sm">{delivery.distance_km} km</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notas */}
        {(delivery.notes || delivery.failure_reason || delivery.delay_reason) && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" />
                Notas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {delivery.notes && <p className="text-sm">{delivery.notes}</p>}
              {delivery.failure_reason && (
                <p className="text-sm text-destructive">
                  <span className="font-medium">Motivo de falha:</span> {delivery.failure_reason}
                </p>
              )}
              {delivery.delay_reason && (
                <p className="text-sm text-amber-600">
                  <span className="font-medium">Motivo de atraso:</span> {delivery.delay_reason}
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
