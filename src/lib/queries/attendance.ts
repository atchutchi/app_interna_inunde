import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

// ─── Types ────────────────────────────────────────────────────────────────────

type AttendanceRow = Database["public"]["Tables"]["attendance"]["Row"];

export type AttendanceWithProfile = AttendanceRow & {
  profile: { full_name: string } | null;
};

export interface AttendanceStats {
  present: number;
  late: number;
  absent: number;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetch today's attendance records joined with profiles.
 */
export async function getTodayAttendance(): Promise<AttendanceWithProfile[]> {
  const supabase = await createClient();

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const { data, error } = await supabase
    .from("attendance")
    .select(`*, profile:profiles(full_name)`)
    .eq("date", today)
    .order("check_in", { ascending: true, nullsFirst: false });

  if (error) throw new Error(`Erro ao carregar assiduidade: ${error.message}`);
  return (data ?? []) as AttendanceWithProfile[];
}

/**
 * Derive attendance stats from a list of records.
 */
export function computeAttendanceStats(records: AttendanceWithProfile[]): AttendanceStats {
  return {
    present: records.filter((r) => r.status === "present").length,
    late: records.filter((r) => r.status === "late").length,
    absent: records.filter((r) => r.status === "absent").length,
  };
}
