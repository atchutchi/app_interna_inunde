"use client";

import * as React from "react";
import { toast } from "sonner";
import { CheckCircle2, XCircle, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DeliveryStatus } from "@/types/app.types";

// Placeholder data — will be filtered by rider_id via RLS
const MY_DELIVERIES = [
  {
    id: "1",
    order_number: "DEL-1047",
    customer_name: "Maria João",
    delivery_zone: "Coqueiro",
    delivery_address: "Rua 5 de Outubro, nº 22",
    status: "in_route" as DeliveryStatus,
    delivery_value: 1000,
  },
  {
    id: "2",
    order_number: "DEL-1048",
    customer_name: "Abdulai Camará",
    delivery_zone: "Bandim",
    delivery_address: "Mercado de Bandim, entrada sul",
    status: "assigned" as DeliveryStatus,
    delivery_value: 1250,
  },
];

export default function MyDeliveriesPage() {
  async function markComplete(id: string) {
    // TODO: Update Supabase
    toast.success("Entrega concluída!", { description: `Entrega ${id} marcada como concluída.` });
  }

  async function markFailed(id: string) {
    // TODO: Update Supabase with failure reason
    toast.error("Entrega falhada", { description: `Entrega ${id} marcada como falhada.` });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-xl font-bold">As minhas entregas</h1>
        <Badge variant="secondary">{MY_DELIVERIES.length} activas</Badge>
      </div>

      {MY_DELIVERIES.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <span className="text-4xl mb-3">📦</span>
            <p className="font-heading font-semibold">Nenhuma entrega atribuída</p>
            <p className="text-sm text-muted-foreground mt-1">
              As tuas entregas vão aparecer aqui
            </p>
          </CardContent>
        </Card>
      ) : (
        MY_DELIVERIES.map((delivery) => (
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
              <div className="p-4 space-y-3">
                <div>
                  <p className="font-heading font-semibold text-lg">{delivery.customer_name}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-[#4CC88A]" />
                    <span>{delivery.delivery_zone} — {delivery.delivery_address}</span>
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
                    className="h-14 gap-2 text-base bg-[#4CC88A] hover:bg-[#3AAE74]"
                    onClick={() => markComplete(delivery.id)}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    Concluída
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 gap-2 text-base border-red-300 text-red-600 hover:bg-red-50"
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
