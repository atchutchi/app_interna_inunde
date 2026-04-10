import type { Metadata } from "next";
import { Plus, TrendingUp, TrendingDown, DollarSign, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Financeiro" };

const SUMMARY = {
  totalIncome: 847_500,
  totalExpenses: 324_200,
  netBalance: 523_300,
  pendingApprovals: 3,
};

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Financeiro</h1>
          <p className="text-sm text-muted-foreground">Controlo de entradas, saídas e saldos</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Registo
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Entradas (Março)
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-bold text-green-600">
              {formatCurrency(SUMMARY.totalIncome)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saídas (Março)
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-bold text-red-600">
              {formatCurrency(SUMMARY.totalExpenses)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saldo Líquido
            </CardTitle>
            <DollarSign className="h-4 w-4 text-[#4CC88A]" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-bold text-[#4CC88A]">
              {formatCurrency(SUMMARY.netBalance)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">
              Aprovações Pendentes
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-bold text-yellow-800">
              {SUMMARY.pendingApprovals}
            </p>
            <p className="text-xs text-yellow-700">registos aguardam aprovação</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="income">
        <TabsList>
          <TabsTrigger value="income">Entradas</TabsTrigger>
          <TabsTrigger value="expenses">Saídas</TabsTrigger>
          <TabsTrigger value="debts">Dívidas</TabsTrigger>
          <TabsTrigger value="shareholders">Capital Sócios</TabsTrigger>
        </TabsList>

        <TabsContent value="income" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center py-8">
                Tabela de entradas financeiras — conectar ao Supabase
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center py-8">
                Tabela de saídas financeiras — conectar ao Supabase
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debts" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center py-8">
                Gestão de dívidas e reembolsos — conectar ao Supabase
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shareholders" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center py-8">
                Capital dos sócios (Fase 2) — conectar ao Supabase
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
