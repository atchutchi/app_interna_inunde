import type { Metadata } from "next";
import { Plus, TrendingUp, TrendingDown, DollarSign, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { FinanceTabs } from "@/components/finance/FinanceTabs";
import {
  getFinanceSummary,
  getIncomeEntries,
  getExpenseEntries,
  getDebts,
  getShareholderCapital,
} from "@/lib/queries/finance";

export const metadata: Metadata = { title: "Financeiro" };

export default async function FinancePage() {
  const [summary, income, expenses, debts, shareholders] = await Promise.all([
    getFinanceSummary(),
    getIncomeEntries(),
    getExpenseEntries(),
    getDebts(),
    getShareholderCapital(),
  ]);

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
            <CardTitle className="text-sm font-medium text-muted-foreground">Entradas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-bold text-green-600">
              {formatCurrency(summary.totalIncome)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Saídas</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-bold text-red-600">
              {formatCurrency(summary.totalExpenses)}
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
              {formatCurrency(summary.netBalance)}
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
              {summary.pendingApprovals}
            </p>
            <p className="text-xs text-yellow-700">registos aguardam aprovação</p>
          </CardContent>
        </Card>
      </div>

      <FinanceTabs
        income={income}
        expenses={expenses}
        debts={debts}
        shareholders={shareholders}
      />
    </div>
  );
}
