import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

// ─── Types ────────────────────────────────────────────────────────────────────

type RiderRow = Database["public"]["Tables"]["riders"]["Row"];

export interface RiderWithProfile extends RiderRow {
  profile: {
    full_name: string;
    phone: string | null;
    avatar_url: string | null;
  } | null;
  /** Computed from joined deliveries count */
  total_deliveries?: number;
  completed_deliveries?: number;
}

export interface RiderDetail extends RiderRow {
  profile: {
    full_name: string;
    phone: string | null;
    avatar_url: string | null;
    role: string;
    department: string | null;
  } | null;
  total_deliveries: number;
  completed_deliveries: number;
  failed_deliveries: number;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetch all riders for the authenticated user's tenant,
 * joined with profile and delivery counts.
 */
export async function getRiders(): Promise<RiderWithProfile[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("riders")
    .select(
      `*,
      profile:profiles(full_name, phone, avatar_url)`
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Erro ao carregar motoboys: ${error.message}`);
  }

  return (data ?? []) as RiderWithProfile[];
}

/**
 * Fetch a single rider by ID with profile and delivery statistics.
 * Returns null if not found or not accessible via RLS.
 */
export async function getRiderById(id: string): Promise<RiderDetail | null> {
  const supabase = await createClient();

  // Fetch rider + profile
  const { data: rider, error: riderError } = await supabase
    .from("riders")
    .select(
      `*,
      profile:profiles(full_name, phone, avatar_url, role, department)`
    )
    .eq("id", id)
    .single();

  if (riderError) {
    if (riderError.code === "PGRST116") return null;
    throw new Error(`Erro ao carregar motoboy: ${riderError.message}`);
  }

  // Fetch delivery stats
  const { data: deliveries, error: deliveriesError } = await supabase
    .from("deliveries")
    .select("status")
    .eq("rider_id", id);

  if (deliveriesError) {
    throw new Error(`Erro ao carregar estatísticas: ${deliveriesError.message}`);
  }

  const total = deliveries?.length ?? 0;
  const completed = deliveries?.filter((d) => d.status === "completed").length ?? 0;
  const failed = deliveries?.filter((d) => d.status === "failed").length ?? 0;

  return {
    ...(rider as RiderWithProfile),
    total_deliveries: total,
    completed_deliveries: completed,
    failed_deliveries: failed,
  } as RiderDetail;
}
