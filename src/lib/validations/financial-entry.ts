import { z } from "zod";
import { APPROVAL_THRESHOLD_XOF, RECEIPT_REQUIRED_THRESHOLD_XOF } from "@/lib/constants";

export const financialEntrySchema = z
  .object({
    entry_type: z.enum(["income", "expense", "transfer"]),
    category: z.string().min(1, "Categoria obrigatória"),
    subcategory: z.string().optional(),
    vertical: z.enum(["icomida", "ientrega", "ieventos", "ilugares"]).optional(),
    origin: z.string().optional(),
    amount: z.coerce.number().min(1, "Valor deve ser maior que 0"),
    currency: z.enum(["XOF", "EUR"]).default("XOF"),
    payment_method: z.enum(["orange_money", "teletaku", "cash", "transfer", "other"]),
    description: z.string().min(3, "Descrição obrigatória"),
    receipt_url: z.string().url().optional(),
    reference_id: z.string().optional(),
    reference_type: z.string().optional(),
  })
  .refine(
    (data) => {
      // Receipt required for expenses above threshold
      if (data.entry_type === "expense" && data.amount >= RECEIPT_REQUIRED_THRESHOLD_XOF) {
        return !!data.receipt_url;
      }
      return true;
    },
    {
      message: `Comprovativo obrigatório para despesas acima de ${RECEIPT_REQUIRED_THRESHOLD_XOF.toLocaleString("pt-PT")} XOF`,
      path: ["receipt_url"],
    }
  );

export type FinancialEntryFormData = z.infer<typeof financialEntrySchema>;

/** Determine if an entry needs second-level approval */
export function needsApproval(amount: number): boolean {
  return amount >= APPROVAL_THRESHOLD_XOF;
}
