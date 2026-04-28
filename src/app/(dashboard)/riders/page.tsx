import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { getRiders } from "@/lib/queries/riders";
import type { RiderStatus } from "@/types/app.types";

export const metadata: Metadata = { title: "Motoboys" };

const STATUS_LABELS: Record<RiderStatus, string> = {
  active: "Activo",
  inactive: "Inactivo",
  suspended: "Suspenso",
};

export default async function RidersPage() {
  const riders = await getRiders();

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

      {riders.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum motoboy encontrado.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {riders.map((rider) => {
            const name = rider.profile?.full_name ?? "—";
            const vehicle = [rider.vehicle_brand, rider.vehicle_type].filter(Boolean).join(" ");
            const status = rider.status as RiderStatus;

            return (
              <Link key={rider.id} href={`/riders/${rider.id}`}>
                <Card className="cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-[#4CC88A] font-heading font-bold text-white">
                        {getInitials(name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-heading font-semibold">{name}</p>
                      <p className="text-xs text-muted-foreground">{vehicle || "—"}</p>
                    </div>
                    <Badge variant={status === "active" ? "success" : "secondary"}>
                      {STATUS_LABELS[status] ?? status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Bike className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">—</span>
                        <span className="text-muted-foreground">entregas</span>
                      </div>
                      <div className="h-4 w-px bg-border" />
                      <div>
                        <span className="font-semibold text-[#4CC88A]">—</span>
                        <span className="ml-1 text-muted-foreground">sucesso</span>
                      </div>
                      <div className="ml-auto font-mono text-xs text-muted-foreground">
                        {rider.vehicle_plate ?? "—"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
