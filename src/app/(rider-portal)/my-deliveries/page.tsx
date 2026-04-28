"use client";

import * as React from "react";
import { toast } from "sonner";
import { CheckCircle2, XCircle, MapPin, Clock, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DeliveryStatus } from "@/types/app.types";
import { useAuth } from "@/hooks/useAuth";
import { useCurrentRider, useMyDeliveries, useUpdateMyDeliveryStatus } from "@/hooks/useRider";

export default function MyDeliveriesPage() {
  const { profile, loading: authLoading } = useAuth();
  const { data: rider, isLoading: riderLoading } = useCurrentRider(profile?.id);
  const { data: deliveries = [], isLoading: deliveriesLoading } = useMyDeliveries(rider?.id);
  const updateStatus = useUpdateMyDeliveryStatus();

  async function markComplete(id: string) {
    await updateStatus.mutateAsync({ id, status: "completed" });
    toast.success("Entrega concluída!", { description: `Entrega ${id} marcada como concluída.` });
  }

  async function markFailed(id: string) {
    await updateStatus.mutateAsync({ id, status: "failed" });
    toast.error("Entrega falhada", { description: `Entrega ${id} marcada como falhada.` });
  }

  const isLoading = authLoading || riderLoading || deliveriesLoading;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-xl font-bold">As minhas entregas</h1>
        <Badge variant="secondary">{deliveries.length} activas</Badge>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            A carregar entregas...
          </CardContent>
        </Card>
      ) : !rider ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="font-heading font-semibold">Perfil de motoboy não encontrado</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Contacta a operação para associar a tua conta a um motoboy.
            </p>
          </CardContent>
        </Card>
      ) : deliveries.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="font-heading font-semibold">Nenhuma entrega atribuída</p>
            <p className="mt-1 text-sm text-muted-foreground">As tuas entregas vão aparecer aqui</p>
          </CardContent>
        </Card>
      ) : (
        deliveries.map((delivery) => (
          <Card key={delivery.id} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Header */}
              <div className="flex items-center justify-between bg-[#1A1A2E] px-4 py-3">
                <span className="font-mono text-sm font-bold text-white">
                  {delivery.order_number}
                </span>
                <span className="text-sm font-semibold text-[#4CC88A]">
                  {delivery.delivery_value.toLocaleString("pt-PT")} XOF
                </span>
              </div>

              {/* Content */}
              <div className="space-y-3 p-4">
                <div>
                  <p className="font-heading text-lg font-semibold">{delivery.customer_name}</p>
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-[#4CC88A]" />
                    <span>
                      {delivery.delivery_zone}
                      {delivery.delivery_address ? ` - ${delivery.delivery_address}` : ""}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {delivery.status === "in_route" ? "Em rota" : "Atribuído — aguarda partida"}
                  </span>
                </div>

                {/* Action buttons — big touch targets */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button
                    size="lg"
                    className="h-14 gap-2 bg-[#4CC88A] text-base hover:bg-[#3AAE74]"
                    disabled={updateStatus.isPending}
                    onClick={() => markComplete(delivery.id)}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    Concluída
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 gap-2 border-red-300 text-base text-red-600 hover:bg-red-50"
                    disabled={updateStatus.isPending}
                    onClick={() => markFailed(delivery.id)}
                  >
                    <XCircle className="h-5 w-5" />
                    Falhada
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
