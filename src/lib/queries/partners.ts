import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

// ─── Types ────────────────────────────────────────────────────────────────────

type PartnerRow = Database["public"]["Tables"]["partners"]["Row"];

export type PartnerWithStats = PartnerRow & {
  total_deliveries: number;
};

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetch all partners for the authenticated user's tenant.
 * RLS ensures only the correct tenant's data is returned.
 */
export async function getPartners(): Promise<PartnerRow[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Erro ao carregar parceiros: ${error.message}`);
  }

  return data ?? [];
}

/**
 * Fetch a single partner by ID with recent delivery count.
 * Returns null if not found or not accessible via RLS.
 */
export async function getPartnerById(id: string): Promise<PartnerWithStats | null> {
  const supabase = createClient();

  const { data: partner, error: partnerError } = await supabase
    .from("partners")
    .select("*")
    .eq("id", id)
    .single();

  if (partnerError) {
    if (partnerError.code === "PGRST116") return null;
    throw new Error(`Erro ao carregar parceiro: ${partnerError.message}`);
  }

  const { count, error: countError } = await supabase
    .from("deliveries")
    .select("id", { count: "exact", head: true })
    .eq("partner_id", id);

  if (countError) {
    throw new Error(`Erro ao carregar entregas do parceiro: ${countError.message}`);
  }

  return { ...partner, total_deliveries: count ?? 0 };
}
