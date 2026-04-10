import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatCurrency, getInitials } from "@/lib/utils";
import { PARTNER_TYPES } from "@/lib/constants";
import type { PartnerType, PartnerStatus } from "@/types/app.types";

export const metadata: Metadata = { title: "Parceiros" };

const MOCK_PARTNERS = [
  { id: "1", name: "Terra e Mar", type: "restaurant" as PartnerType, status: "active" as PartnerStatus, commissionPct: 15, balance: 245_000 },
  { id: "2", name: "Restaurante Central", type: "restaurant" as PartnerType, status: "active" as PartnerStatus, commissionPct: 15, balance: 180_000 },
  { id: "3", name: "PME Logística Lda", type: "b2b_delivery" as PartnerType, status: "active" as PartnerStatus, commissionPct: 8, balance: 95_000 },
  { id: "4", name: "Bissau Events", type: "events" as PartnerType, status: "active" as PartnerStatus, commissionPct: 10, balance: 45_000 },
];

export default function PartnersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Parceiros</h1>
          <p className="text-sm text-muted-foreground">Restaurantes, fornecedores e parceiros B2B</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Parceiro
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_PARTNERS.map((partner) => (
          <Card
            key={partner.id}
            className="cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-[#3B82F6] text-white font-heading font-bold text-sm">
                    {getInitials(partner.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-semibold truncate">{partner.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {PARTNER_TYPES[partner.type]}
                  </p>
                </div>
                <Badge variant={partner.status === "active" ? "success" : "secondary"}>
                  {partner.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">Comissão: </span>
                  <span className="font-semibold">{partner.commissionPct}%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Saldo: </span>
                  <span className="font-semibold text-[#4CC88A]">
                    {formatCurrency(partner.balance)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
