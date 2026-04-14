"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
  PAYMENT_METHODS,
  DEBT_STATUSES,
} from "@/lib/constants";
import type { FinancialEntry, Debt, ShareholderCapital } from "@/lib/queries/finance";
import type { IncomeCategory, ExpenseCategory, PaymentMethod, DebtStatus } from "@/types/app.types";

const ENTRY_STATUS_LABELS: Record<string, string> = {
  pending: "Pendente",
  approved: "Aprovado",
  rejected: "Rejeitado",
};

const ENTRY_STATUS_VARIANTS: Record<string, "secondary" | "success" | "destructive"> = {
  pending: "secondary",
  approved: "success",
  rejected: "destructive",
};

interface Props {
  income: FinancialEntry[];
  expenses: FinancialEntry[];
  debts: Debt[];
  shareholders: ShareholderCapital[];
}

export function FinanceTabs({ income, expenses, debts, shareholders }: Props) {
  return (
    <Tabs defaultValue="income">
      <TabsList>
        <TabsTrigger value="income">Entradas</TabsTrigger>
        <TabsTrigger value="expenses">Saídas</TabsTrigger>
        <TabsTrigger value="debts">Dívidas</TabsTrigger>
        <TabsTrigger value="shareholders">Capital Sócios</TabsTrigger>
      </TabsList>

      {/* ── Entradas ─────────────────────────────────────────────────────── */}
      <TabsContent value="income" className="mt-4">
        <Card>
          {income.length === 0 ? (
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              Nenhuma entrada registada.
            </CardContent>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="hidden md:table-cell">Categoria</TableHead>
                  <TableHead className="hidden md:table-cell">Pagamento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="hidden lg:table-cell">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {income.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.description}</TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                      {INCOME_CATEGORIES[entry.category as IncomeCategory] ?? entry.category}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                      {PAYMENT_METHODS[entry.payment_method as PaymentMethod] ??
                        entry.payment_method}
                    </TableCell>
                    <TableCell>
                      <Badge variant={ENTRY_STATUS_VARIANTS[entry.status] ?? "secondary"}>
                        {ENTRY_STATUS_LABELS[entry.status] ?? entry.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-green-600">
                      {formatCurrency(entry.amount)}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                      {formatDate(entry.created_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </TabsContent>

      {/* ── Saídas ───────────────────────────────────────────────────────── */}
      <TabsContent value="expenses" className="mt-4">
        <Card>
          {expenses.length === 0 ? (
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              Nenhuma saída registada.
            </CardContent>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="hidden md:table-cell">Categoria</TableHead>
                  <TableHead className="hidden md:table-cell">Pagamento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="hidden lg:table-cell">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.description}</TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                      {EXPENSE_CATEGORIES[entry.category as ExpenseCategory] ?? entry.category}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                      {PAYMENT_METHODS[entry.payment_method as PaymentMethod] ??
                        entry.payment_method}
                    </TableCell>
                    <TableCell>
                      <Badge variant={ENTRY_STATUS_VARIANTS[entry.status] ?? "secondary"}>
                        {ENTRY_STATUS_LABELS[entry.status] ?? entry.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-red-600">
                      {formatCurrency(entry.amount)}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                      {formatDate(entry.created_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </TabsContent>

      {/* ── Dívidas ──────────────────────────────────────────────────────── */}
      <TabsContent value="debts" className="mt-4">
        <Card>
          {debts.length === 0 ? (
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              Nenhuma dívida registada.
            </CardContent>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Devedor / Credor</TableHead>
                  <TableHead className="hidden md:table-cell">Motivo</TableHead>
                  <TableHead>Direcção</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="hidden lg:table-cell">Vencimento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {debts.map((debt) => {
                  const statusConfig = DEBT_STATUSES[debt.status as DebtStatus];
                  return (
                    <TableRow key={debt.id}>
                      <TableCell className="font-medium">{debt.debtor_creditor_name}</TableCell>
                      <TableCell className="hidden max-w-[200px] truncate text-sm text-muted-foreground md:table-cell">
                        {debt.reason}
                      </TableCell>
                      <TableCell>
                        <Badge variant={debt.direction === "receivable" ? "success" : "destructive"}>
                          {debt.direction === "receivable" ? "A receber" : "A pagar"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${statusConfig?.color ?? ""}`}>
                          {statusConfig?.label ?? debt.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(debt.amount)}
                      </TableCell>
                      <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                        {debt.due_date ? formatDate(debt.due_date) : "—"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Card>
      </TabsContent>

      {/* ── Capital Sócios ───────────────────────────────────────────────── */}
      <TabsContent value="shareholders" className="mt-4">
        <Card>
          {shareholders.length === 0 ? (
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              Nenhum registo de capital dos sócios.
            </CardContent>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sócio</TableHead>
                  <TableHead className="hidden md:table-cell">Papel</TableHead>
                  <TableHead className="hidden md:table-cell">Tipo</TableHead>
                  <TableHead className="hidden lg:table-cell">Finalidade</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="hidden lg:table-cell">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shareholders.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.shareholder_name}</TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                      {entry.shareholder_role ?? "—"}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                      {entry.entry_type}
                    </TableCell>
                    <TableCell className="hidden max-w-[180px] truncate text-sm text-muted-foreground lg:table-cell">
                      {entry.purpose ?? "—"}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(entry.amount)}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                      {formatDate(entry.entry_date)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
