import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

// ─── Types ────────────────────────────────────────────────────────────────────

type DeliveryRow = Database["public"]["Tables"]["deliveries"]["Row"];

export interface DeliveryWithRider extends DeliveryRow {
  rider: {
    id: string;
    vehicle_plate: string | null;
    profile: { full_name: string } | null;
  } | null;
  partner: { name: string } | null;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetch all deliveries for the authenticated user's tenant,
 * joined with rider profile name and partner name.
 * RLS ensures only the correct tenant's data is returned.
 */
export async function getDeliveries(): Promise<DeliveryWithRider[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("deliveries")
    .select(
      `*,
      rider:riders(
        id,
        vehicle_plate,
        profile:profiles(full_name)
      ),
      partner:partners(name)`
    )
    .order("requested_at", { ascending: false })
    .limit(200);

  if (error) {
    throw new Error(`Erro ao carregar entregas: ${error.message}`);
  }

  return (data ?? []) as DeliveryWithRider[];
}

/**
 * Fetch a single delivery by ID with full joins.
 * Returns null if not found or not accessible via RLS.
 */
export async function getDeliveryById(id: string): Promise<DeliveryWithRider | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("deliveries")
    .select(
      `*,
      rider:riders(
        id,
        vehicle_plate,
        vehicle_type,
        vehicle_brand,
        profile:profiles(full_name, phone)
      ),
      partner:partners(name, type, contact_name, phone)`
    )
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    throw new Error(`Erro ao carregar entrega: ${error.message}`);
  }

  return data as DeliveryWithRider;
}
