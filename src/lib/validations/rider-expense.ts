import { z } from "zod";

export const riderExpenseSchema = z.object({
  expense_type: z.enum(["fuel", "maintenance", "other"]),
  amount: z.coerce.number().min(1, "Valor obrigatório"),
  description: z.string().optional(),
  receipt_url: z.string().url().optional(),
  expense_date: z.string().default(() => new Date().toISOString().split("T")[0]),
});

export type RiderExpenseFormData = z.infer<typeof riderExpenseSchema>;
