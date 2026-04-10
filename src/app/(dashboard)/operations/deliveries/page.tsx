import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeliveryTable } from "@/components/operations/DeliveryTable";

export const metadata: Metadata = { title: "Entregas" };

export default function DeliveriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Entregas</h1>
          <p className="text-sm text-muted-foreground">Gerir todas as entregas activas e históricas</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Entrega
        </Button>
      </div>
      <DeliveryTable />
    </div>
  );
}
