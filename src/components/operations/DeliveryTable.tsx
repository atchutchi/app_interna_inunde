"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { formatDate, formatCurrency, formatPhone } from "@/lib/utils";
import { DeliveryStatusBadge } from "@/components/operations/DeliveryStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { DELIVERY_SOURCES } from "@/lib/constants";
import type { DeliveryWithRider } from "@/lib/queries/deliveries";
import type { DeliverySource } from "@/types/app.types";

interface DeliveryTableProps {
  deliveries: DeliveryWithRider[];
}

export function DeliveryTable({ deliveries }: DeliveryTableProps) {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  const filtered = deliveries.filter(
    (d) =>
      d.order_number.toLowerCase().includes(search.toLowerCase()) ||
      d.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      d.delivery_zone.toLowerCase().includes(search.toLowerCase())
  );

  const getRiderName = (delivery: DeliveryWithRider): string => {
    return delivery.rider?.profile?.full_name ?? "—";
  };

  return (
    <Card>
      {/* Toolbar */}
      <div className="flex items-center gap-3 p-4 border-b">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por número, cliente ou zona..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nº Entrega</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="hidden sm:table-cell">Zona</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="hidden md:table-cell">Origem</TableHead>
            <TableHead className="hidden lg:table-cell">Motoboy</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="hidden lg:table-cell">Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                Nenhuma entrega encontrada
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((delivery) => (
              <TableRow
                key={delivery.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors duration-100"
                onClick={() => router.push(`/operations/deliveries/${delivery.id}`)}
              >
                <TableCell className="font-mono text-sm font-semibold">
                  {delivery.order_number}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{delivery.customer_name}</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      {formatPhone(delivery.customer_phone)}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="secondary">{delivery.delivery_zone}</Badge>
                </TableCell>
                <TableCell>
                  <DeliveryStatusBadge status={delivery.status as Parameters<typeof DeliveryStatusBadge>[0]["status"]} />
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                  {DELIVERY_SOURCES[delivery.source as DeliverySource] ?? delivery.source}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm">
                  {getRiderName(delivery)}
                </TableCell>
                <TableCell className="text-right font-semibold text-sm">
                  {formatCurrency(delivery.delivery_value)}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {formatDate(delivery.requested_at)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
