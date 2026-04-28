import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatCurrency, getInitials } from "@/lib/utils";
import { PARTNER_TYPES } from "@/lib/constants";
import { getPartners } from "@/lib/queries/partners";
import type { PartnerType, PartnerStatus } from "@/types/app.types";

export const metadata: Metadata = { title: "Parceiros" };

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Parceiros</h1>
          <p className="text-sm text-muted-foreground">
            Restaurantes, fornecedores e parceiros B2B
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Parceiro
        </Button>
      </div>

      {partners.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum parceiro encontrado.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => {
            const status = partner.status as PartnerStatus;
            const type = partner.type as PartnerType;

            return (
              <Link key={partner.id} href={`/partners/${partner.id}`}>
                <Card className="cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[#3B82F6] font-heading text-sm font-bold text-white">
                          {getInitials(partner.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-heading font-semibold">{partner.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {PARTNER_TYPES[type] ?? type}
                        </p>
                      </div>
                      <Badge variant={status === "active" ? "success" : "secondary"}>
                        {status === "active"
                          ? "Activo"
                          : status === "pending"
                            ? "Pendente"
                            : "Inactivo"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground">Comissão: </span>
                        <span className="font-semibold">
                          {partner.commission_pct != null ? `${partner.commission_pct}%` : "—"}
                        </span>
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
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
