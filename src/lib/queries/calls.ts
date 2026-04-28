import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

// ─── Types ────────────────────────────────────────────────────────────────────

type CallRow = Database["public"]["Tables"]["calls"]["Row"];

export type CallWithOperator = CallRow & {
  operator: { full_name: string } | null;
};

export interface CallStats {
  today: number;
  converted: number;
  failed: number;
  conversionRate: number;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Stats for calls made today (tenant-scoped via RLS).
 */
export async function getCallStats(): Promise<CallStats> {
  const supabase = await createClient();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("calls")
    .select("outcome")
    .gte("call_datetime", todayStart.toISOString());

  if (error) throw new Error(`Erro ao carregar estatísticas de chamadas: ${error.message}`);

  const calls = data ?? [];
  const today = calls.length;
  const converted = calls.filter((c) => c.outcome === "converted").length;
  const failed = calls.filter((c) => c.outcome === "failed").length;
  const conversionRate = today > 0 ? Math.round((converted / today) * 100 * 10) / 10 : 0;

  return { today, converted, failed, conversionRate };
}

/**
 * Recent calls (last 50), joined with operator profile name.
 */
export async function getRecentCalls(): Promise<CallWithOperator[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("calls")
    .select(`*, operator:profiles!calls_operator_id_fkey(full_name)`)
    .order("call_datetime", { ascending: false })
    .limit(50);

  if (error) throw new Error(`Erro ao carregar chamadas: ${error.message}`);
  return (data ?? []) as CallWithOperator[];
}
