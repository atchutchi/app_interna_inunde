"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Camera, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RIDER_EXPENSE_TYPES } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { RiderExpenseType } from "@/types/app.types";

const expenseSchema = z.object({
  expense_type: z.enum(["fuel", "maintenance", "other"]),
  amount: z.coerce.number().min(1, "Valor obrigatório"),
  description: z.string().optional(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

const MOCK_EXPENSES = [
  { id: "1", type: "fuel" as RiderExpenseType, amount: 12000, status: "approved", date: new Date().toISOString() },
  { id: "2", type: "maintenance" as RiderExpenseType, amount: 25000, status: "pending", date: new Date(Date.now() - 86400000).toISOString() },
];

export default function MyExpensesPage() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(expenseSchema) });

  async function onSubmit(data: ExpenseFormData) {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Despesa registada!", {
      description: "Aguarda aprovação do responsável.",
    });
    reset();
  }

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
                    <SelectItem key={value} value={value} className="text-base py-3">
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
              {errors.amount && (
                <p className="text-xs text-destructive">{errors.amount.message}</p>
              )}
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
              className="w-full h-12 gap-2 text-base border-dashed"
            >
              <Camera className="h-5 w-5" />
              Tirar foto do comprovativo
            </Button>

            <Button type="submit" className="w-full h-14 text-base" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  A registar...
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
        <h2 className="font-heading font-semibold mb-3">Despesas recentes</h2>
        <div className="space-y-3">
          {MOCK_EXPENSES.map((expense) => (
            <Card key={expense.id}>
              <CardContent className="flex items-center gap-4 py-4">
                <div className="flex-1">
                  <p className="font-medium">{RIDER_EXPENSE_TYPES[expense.type]}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(expense.date)}</p>
                </div>
                <div className="text-right">
                  <p className="font-heading font-bold">{formatCurrency(expense.amount)}</p>
                  <Badge variant={expense.status === "approved" ? "success" : "warning"} className="text-xs">
                    {expense.status === "approved" ? "Aprovado" : "Pendente"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
