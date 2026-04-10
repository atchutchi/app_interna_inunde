"use client";

import * as React from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter } from "lucide-react";
import { DELIVERY_SOURCES } from "@/lib/constants";
import type { DeliveryStatus, DeliverySource } from "@/types/app.types";

// Placeholder data — replace with Supabase query via TanStack Query
const MOCK_DELIVERIES = [
  {
    id: "1",
    order_number: "DEL-1047",
    customer_name: "Maria João",
    customer_phone: "+245966123001",
    delivery_zone: "Coqueiro",
    status: "in_route" as DeliveryStatus,
    source: "app" as DeliverySource,
    delivery_value: 1000,
    requested_at: new Date().toISOString(),
    rider_name: "Mário Silva",
  },
  {
    id: "2",
    order_number: "DEL-1046",
    customer_name: "Abdulai Camará",
    customer_phone: "+245966123002",
    delivery_zone: "Bandim",
    status: "completed" as DeliveryStatus,
    source: "call_center" as DeliverySource,
    delivery_value: 1250,
    requested_at: new Date(Date.now() - 3600000).toISOString(),
    rider_name: "João Fati",
  },
  {
    id: "3",
    order_number: "DEL-1045",
    customer_name: "Fatumata Diallo",
    customer_phone: "+245966123003",
    delivery_zone: "Praça",
    status: "failed" as DeliveryStatus,
    source: "app" as DeliverySource,
    delivery_value: 500,
    requested_at: new Date(Date.now() - 7200000).toISOString(),
    rider_name: "Pedro Gomes",
  },
];

export function DeliveryTable() {
  const [search, setSearch] = React.useState("");
  const [loading] = React.useState(false);

  const filtered = MOCK_DELIVERIES.filter(
    (d) =>
      d.order_number.toLowerCase().includes(search.toLowerCase()) ||
      d.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      d.delivery_zone.toLowerCase().includes(search.toLowerCase())
  );

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
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 8 }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : filtered.length === 0 ? (
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
                  <DeliveryStatusBadge status={delivery.status} />
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                  {DELIVERY_SOURCES[delivery.source]}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm">
                  {delivery.rider_name}
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
