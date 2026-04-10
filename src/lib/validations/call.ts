import { z } from "zod";

export const callSchema = z.object({
  customer_phone: z.string().min(7, "Telefone obrigatório"),
  customer_name: z.string().optional(),
  zone: z.string().optional(),
  order_type: z.string().optional(),
  rider_id: z.string().uuid().optional(),
  outcome: z.enum(["converted", "failed", "info", "complaint", "no_answer"]),
  failure_reason: z.string().optional(),
  notes: z.string().optional(),
});

export type CallFormData = z.infer<typeof callSchema>;
