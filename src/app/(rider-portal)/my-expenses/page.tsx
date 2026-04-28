"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Camera, Loader2, CheckCircle2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RIDER_EXPENSE_TYPES } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { RiderExpenseType } from "@/types/app.types";
import { useAuth } from "@/hooks/useAuth";
import { useCreateRiderExpense, useCurrentRider, useMyExpenses } from "@/hooks/useRider";

const expenseSchema = z.object({
  expense_type: z.enum(["fuel", "maintenance", "other"]),
  amount: z.coerce.number().min(1, "Valor obrigatório"),
  description: z.string().optional(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export default function MyExpensesPage() {
  const { profile, loading: authLoading } = useAuth();
  const { data: rider, isLoading: riderLoading } = useCurrentRider(profile?.id);
  const { data: expenses = [], isLoading: expensesLoading } = useMyExpenses(rider?.id);
  const createExpense = useCreateRiderExpense();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(expenseSchema) });

  async function onSubmit(data: ExpenseFormData) {
    if (!profile || !rider) {
      toast.error("Perfil de motoboy não encontrado");
      return;
    }

    await createExpense.mutateAsync({
      tenant_id: profile.tenant_id,
      rider_id: rider.id,
      created_by: profile.id,
      expense_type: data.expense_type,
      amount: data.amount,
      description: data.description || null,
    });
    reset();
  }

  const isLoading = authLoading || riderLoading || expensesLoading;

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-xl font-bold">As minhas despesas</h1>

      {/* New expense form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Registar despesa</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de despesa</Label>
              <Select onValueChange={(v) => setValue("expense_type", v as RiderExpenseType)}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(RIDER_EXPENSE_TYPES).map(([value, label]) => (
                    <SelectItem key={value} value={value} className="py-3 text-base">
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Valor (XOF)</Label>
              <Input
                type="number"
                placeholder="0"
                className="h-12 text-base"
                {...register("amount")}
              />
              {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Descrição (opcional)</Label>
              <Input
                placeholder="Ex: Gasolina estação Shell Bandim"
                className="h-12 text-base"
                {...register("description")}
              />
            </div>

            {/* Photo upload — important for approval */}
            <Button
              type="button"
              variant="outline"
              className="h-12 w-full gap-2 border-dashed text-base"
            >
              <Camera className="h-5 w-5" />
              Tirar foto do comprovativo
            </Button>

            <Button type="submit" className="h-14 w-full text-base" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />A registar...
                </>
              ) : (
                <>
                  <CheckCircle2 />
                  Registar Despesa
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent expenses */}
      <div>
        <h2 className="mb-3 font-heading font-semibold">Despesas recentes</h2>
        <div className="space-y-3">
          {isLoading ? (
            <Card>
              <CardContent className="py-8 text-center text-sm text-muted-foreground">
                A carregar despesas...
              </CardContent>
            </Card>
          ) : !rider ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Wallet className="mb-3 h-9 w-9 text-muted-foreground" />
                <p className="font-heading font-semibold">Perfil de motoboy não encontrado</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Contacta a operação para associar a tua conta a um motoboy.
                </p>
              </CardContent>
            </Card>
          ) : expenses.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Wallet className="mb-3 h-9 w-9 text-muted-foreground" />
                <p className="font-heading font-semibold">Nenhuma despesa registada</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  As tuas despesas recentes vão aparecer aqui.
                </p>
              </CardContent>
            </Card>
          ) : (
            expenses.map((expense) => (
              <Card key={expense.id}>
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="flex-1">
                    <p className="font-medium">
                      {RIDER_EXPENSE_TYPES[expense.expense_type as RiderExpenseType]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(expense.expense_date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-bold">{formatCurrency(expense.amount)}</p>
                    <Badge
                      variant={expense.status === "approved" ? "success" : "warning"}
                      className="text-xs"
                    >
                      {expense.status === "approved" ? "Aprovado" : "Pendente"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
