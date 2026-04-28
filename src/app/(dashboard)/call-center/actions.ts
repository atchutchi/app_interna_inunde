"use server";

import { createClient } from "@/lib/supabase/server";

interface CallInput {
  customer_phone: string;
  customer_name?: string;
  zone?: string;
  order_type?: string;
  outcome: "converted" | "failed" | "info" | "complaint" | "no_answer";
  notes?: string;
}

export async function registerCall(input: CallInput): Promise<{ error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Não autenticado" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("tenant_id")
    .eq("id", user.id)
    .single();

  if (!profile) return { error: "Perfil não encontrado" };

  const { error } = await supabase.from("calls").insert({
    customer_phone: input.customer_phone,
    customer_name: input.customer_name ?? null,
    zone: input.zone ?? null,
    order_type: input.order_type ?? null,
    outcome: input.outcome,
    notes: input.notes ?? null,
    operator_id: user.id,
    tenant_id: profile.tenant_id,
  });

  if (error) return { error: error.message };
  return {};
}
