import type { Metadata } from "next";
import {
  Package,
  DollarSign,
  TrendingUp,
  PhoneCall,
  Bike,
  CheckCircle2,
} from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { VerticalBreakdown } from "@/components/dashboard/VerticalBreakdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Dashboard" };

// Placeholder data — will be replaced with real Supabase queries
const KPI_DATA = [
  {
    label: "Receita Total",
    value: 2_847_500,
    format: "currency" as const,
    trend: 12.4,
  },
  {
    label: "Despesa Total",
    value: 1_234_200,
    format: "currency" as const,
    trend: 5.1,
  },
  {
    label: "Saldo Líquido",
    value: 1_613_300,
    format: "currency" as const,
    trend: 18.7,
  },
  {
    label: "Total de Entregas",
    value: 1_047,
    format: "number" as const,
    trend: 8.3,
  },
  {
    label: "Taxa de Conclusão",
    value: 87.4,
    format: "percent" as const,
    unit: "%",
    trend: 2.1,
  },
  {
    label: "Chamadas Hoje",
    value: 34,
    format: "number" as const,
    trend: -4.5,
  },
  {
    label: "Conversão Call Center",
    value: 68.2,
    format: "percent" as const,
    unit: "%",
    trend: 5.8,
  },
  {
    label: "Motoboys Activos",
    value: 6,
    format: "number" as const,
    trend: 0,
  },
];

const REVENUE_DATA = [
  { month: "Out", receitas: 420000, despesas: 210000, liquido: 210000 },
  { month: "Nov", receitas: 510000, despesas: 240000, liquido: 270000 },
  { month: "Dez", receitas: 680000, despesas: 290000, liquido: 390000 },
  { month: "Jan", receitas: 590000, despesas: 260000, liquido: 330000 },
  { month: "Fev", receitas: 720000, despesas: 310000, liquido: 410000 },
  { month: "Mar", receitas: 847500, despesas: 324200, liquido: 523300 },
];

const VERTICAL_DATA = [
  { vertical: "icomida" as const, value: 1_650_000, count: 754 },
  { vertical: "ientrega" as const, value: 980_000, count: 248 },
  { vertical: "ieventos" as const, value: 145_000, count: 35 },
  { vertical: "ilugares" as const, value: 72_500, count: 10 },
];

const TOP_RIDERS = [
  { name: "Mário Silva", deliveries: 187, rate: 94 },
  { name: "João Fati", deliveries: 162, rate: 91 },
  { name: "Pedro Gomes", deliveries: 148, rate: 89 },
  { name: "Abdulai Bah", deliveries: 134, rate: 88 },
  { name: "Braima Sow", deliveries: 89, rate: 85 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Visão geral — Março 2026</p>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPI_DATA.map((kpi) => (
          <KPICard key={kpi.label} data={kpi} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={REVENUE_DATA} />
        </div>
        <VerticalBreakdown data={VERTICAL_DATA} />
      </div>

      {/* Bottom row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Top riders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bike className="h-4 w-4 text-[#4CC88A]" />
              Top Motoboys (Março)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {TOP_RIDERS.map((rider, i) => (
                <div key={rider.name} className="flex items-center gap-3">
                  <span className="w-5 text-sm font-bold text-muted-foreground">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{rider.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {rider.deliveries} entregas
                        </Badge>
                        <Badge variant="success" className="text-xs">
                          {rider.rate}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle2 className="h-4 w-4 text-[#4CC88A]" />
              Actividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { text: "Entrega #1047 concluída", time: "há 3 min", type: "success" },
                { text: "Nova chamada registada — zona Coqueiro", time: "há 8 min", type: "info" },
                { text: "Despesa de combustível aprovada", time: "há 15 min", type: "warning" },
                { text: "Entrega #1046 atribuída a Mário Silva", time: "há 22 min", type: "info" },
                { text: "Entrada financeira: 85.000 XOF", time: "há 34 min", type: "success" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      item.type === "success"
                        ? "bg-green-500"
                        : item.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-foreground">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
