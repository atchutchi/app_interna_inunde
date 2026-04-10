import type { Metadata } from "next";
import { PhoneCall, TrendingUp, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CallForm } from "@/components/call-center/CallForm";

export const metadata: Metadata = { title: "Call Center" };

const STATS = {
  today: 34,
  converted: 23,
  failed: 11,
  conversionRate: 67.6,
};

export default function CallCenterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Call Center</h1>
        <p className="text-sm text-muted-foreground">Registo rápido de chamadas e conversões</p>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Chamadas Hoje</CardTitle>
            <PhoneCall className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-bold">{STATS.today}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Convertidas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-bold text-green-600">{STATS.converted}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Não Convertidas</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-bold text-red-600">{STATS.failed}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#4CC88A]" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-bold text-[#4CC88A]">
              {STATS.conversionRate}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Call registration form */}
      <CallForm />
    </div>
  );
}
