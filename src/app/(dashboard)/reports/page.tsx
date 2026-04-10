import type { Metadata } from "next";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Relatórios" };

const REPORT_TYPES = [
  {
    title: "Relatório Financeiro",
    description: "Entradas vs saídas, saldo por categoria e período",
    icon: "💰",
    formats: ["Excel", "PDF"],
  },
  {
    title: "Relatório de Entregas",
    description: "Total de entregas, por vertical, motoboy e zona",
    icon: "📦",
    formats: ["Excel", "PDF"],
  },
  {
    title: "Relatório Call Center",
    description: "Chamadas, conversões e performance por operador",
    icon: "📞",
    formats: ["Excel"],
  },
  {
    title: "Relatório de Motoboys",
    description: "Performance, despesas e ganhos por motoboy",
    icon: "🏍️",
    formats: ["Excel", "PDF"],
  },
  {
    title: "Fecho Diário",
    description: "Resumo do dia: entradas, saídas e saldo líquido",
    icon: "📅",
    formats: ["PDF"],
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Relatórios</h1>
        <p className="text-sm text-muted-foreground">Exportar dados e análises por período</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REPORT_TYPES.map((report) => (
          <Card
            key={report.title}
            className="hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{report.icon}</span>
                <CardTitle className="text-base">{report.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{report.description}</p>
              <div className="flex gap-2">
                {report.formats.map((format) => (
                  <Button key={format} variant="outline" size="sm" className="gap-1.5">
                    <Download className="h-3.5 w-3.5" />
                    {format}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#4CC88A]" />
            Relatório Personalizado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Filtrar por período, categoria, vertical e exportar — disponível após integração Supabase.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
