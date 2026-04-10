import type { Metadata } from "next";
import { Plus, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

export const metadata: Metadata = { title: "Motoboys" };

const MOCK_RIDERS = [
  { id: "1", name: "Mário Silva", vehicle: "Jakarta 150cc", plate: "BA-1234", status: "active", deliveries: 187, successRate: 94 },
  { id: "2", name: "João Fati", vehicle: "Jakarta 150cc", plate: "BA-5678", status: "active", deliveries: 162, successRate: 91 },
  { id: "3", name: "Pedro Gomes", vehicle: "Honda CG 150", plate: "BA-9012", status: "active", deliveries: 148, successRate: 89 },
  { id: "4", name: "Abdulai Bah", vehicle: "Jakarta 150cc", plate: "BA-3456", status: "active", deliveries: 134, successRate: 88 },
  { id: "5", name: "Braima Sow", vehicle: "Honda CG 150", plate: "BA-7890", status: "inactive", deliveries: 89, successRate: 85 },
];

export default function RidersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Motoboys</h1>
          <p className="text-sm text-muted-foreground">Gestão da frota de motoboys</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Motoboy
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_RIDERS.map((rider) => (
          <Card
            key={rider.id}
            className="cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-[#4CC88A] text-white font-heading font-bold">
                  {getInitials(rider.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold truncate">{rider.name}</p>
                <p className="text-xs text-muted-foreground">{rider.vehicle}</p>
              </div>
              <Badge variant={rider.status === "active" ? "success" : "secondary"}>
                {rider.status === "active" ? "Activo" : "Inactivo"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Bike className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{rider.deliveries}</span>
                  <span className="text-muted-foreground">entregas</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div>
                  <span className="font-semibold text-[#4CC88A]">{rider.successRate}%</span>
                  <span className="text-muted-foreground ml-1">sucesso</span>
                </div>
                <div className="ml-auto text-xs text-muted-foreground font-mono">{rider.plate}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
