import { z } from "zod";

export const deliverySchema = z.object({
  source: z.enum(["app", "call_center", "partner", "b2b", "terra_e_mar", "other"]),
  vertical: z.enum(["icomida", "ientrega", "ieventos", "ilugares"]),
  customer_name: z.string().min(2, "Nome obrigatório"),
  customer_phone: z.string().min(7, "Telefone obrigatório"),
  delivery_zone: z.string().min(1, "Zona obrigatória"),
  delivery_address: z.string().optional(),
  partner_id: z.string().uuid().optional(),
  rider_id: z.string().uuid().optional(),
  delivery_value: z.coerce.number().min(0, "Valor deve ser positivo"),
  operational_cost: z.coerce.number().min(0).optional(),
  commission: z.coerce.number().min(0).optional(),
  notes: z.string().optional(),
});

export type DeliveryFormData = z.infer<typeof deliverySchema>;

export const deliveryStatusUpdateSchema = z.object({
  status: z.enum(["received", "preparing", "assigned", "in_route", "completed", "failed", "cancelled", "refunded"]),
  failure_reason: z.string().optional(),
  delay_reason: z.string().optional(),
});
