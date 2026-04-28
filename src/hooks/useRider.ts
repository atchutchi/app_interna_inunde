"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database.types";

type RiderExpense = Database["public"]["Tables"]["rider_expenses"]["Row"];
type RiderExpenseInsert = Database["public"]["Tables"]["rider_expenses"]["Insert"];
type Rider = Database["public"]["Tables"]["riders"]["Row"];
type Delivery = Database["public"]["Tables"]["deliveries"]["Row"];

const MY_DELIVERY_COLUMNS = `
  id,
  order_number,
  customer_name,
  delivery_zone,
  delivery_address,
  status,
  delivery_value,
  requested_at,
  assigned_at,
  departed_at,
  completed_at
`;

const RIDER_EXPENSE_COLUMNS = `
  id,
  rider_id,
  expense_type,
  amount,
  description,
  receipt_url,
  status,
  expense_date,
  created_at
`;

export type MyDelivery = Pick<
  Delivery,
  | "id"
  | "order_number"
  | "customer_name"
  | "delivery_zone"
  | "delivery_address"
  | "status"
  | "delivery_value"
  | "requested_at"
  | "assigned_at"
  | "departed_at"
  | "completed_at"
>;

export type MyRiderExpense = Pick<
  RiderExpense,
  | "id"
  | "rider_id"
  | "expense_type"
  | "amount"
  | "description"
  | "receipt_url"
  | "status"
  | "expense_date"
  | "created_at"
>;

/** Resolve the rider row owned by the authenticated profile. */
export function useCurrentRider(profileId: string | undefined) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["current_rider", profileId],
    queryFn: async () => {
      if (!profileId) return null;

      const { data, error } = await supabase
        .from("riders")
        .select("id, tenant_id, profile_id, status, vehicle_type, vehicle_plate, vehicle_brand")
        .eq("profile_id", profileId)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null;
        throw error;
      }

      return data as Pick<
        Rider,
        | "id"
        | "tenant_id"
        | "profile_id"
        | "status"
        | "vehicle_type"
        | "vehicle_plate"
        | "vehicle_brand"
      >;
    },
    enabled: !!profileId,
  });
}

/** Fetch the current rider's active deliveries. */
export function useMyDeliveries(riderId: string | undefined) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["my_deliveries", riderId],
    queryFn: async () => {
      if (!riderId) return [];
      const { data, error } = await supabase
        .from("deliveries")
        .select(MY_DELIVERY_COLUMNS)
        .eq("rider_id", riderId)
        .in("status", ["assigned", "in_route"])
        .order("requested_at", { ascending: true });

      if (error) throw error;
      return data as MyDelivery[];
    },
    enabled: !!riderId,
  });
}

/** Fetch the current rider's expenses */
export function useMyExpenses(riderId: string | undefined) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["my_expenses", riderId],
    queryFn: async () => {
      if (!riderId) return [];
      const { data, error } = await supabase
        .from("rider_expenses")
        .select(RIDER_EXPENSE_COLUMNS)
        .eq("rider_id", riderId)
        .order("expense_date", { ascending: false })
        .limit(20);

      if (error) throw error;
      return data as MyRiderExpense[];
    },
    enabled: !!riderId,
  });
}

/** Update one of the current rider's deliveries. RLS limits access to own deliveries. */
export function useUpdateMyDeliveryStatus() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      failureReason,
    }: {
      id: string;
      status: "completed" | "failed";
      failureReason?: string;
    }) => {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from("deliveries")
        .update({
          status,
          completed_at: now,
          failure_reason:
            status === "failed" ? (failureReason ?? "Marcada como falhada pelo motoboy") : null,
          updated_at: now,
        })
        .eq("id", id)
        .select(MY_DELIVERY_COLUMNS)
        .single();

      if (error) throw error;
      return data as MyDelivery;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my_deliveries"] });
    },
    onError: (error: Error) => {
      toast.error("Erro ao actualizar entrega", { description: error.message });
    },
  });
}

/** Create a new rider expense */
export function useCreateRiderExpense() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense: RiderExpenseInsert) => {
      const { data, error } = await supabase
        .from("rider_expenses")
        .insert(expense)
        .select(RIDER_EXPENSE_COLUMNS)
        .single();
      if (error) throw error;
      return data as MyRiderExpense;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my_expenses"] });
      toast.success("Despesa registada!", {
        description: "O responsável vai analisar o pedido.",
      });
    },
    onError: (error: Error) => {
      toast.error("Erro ao registar despesa", { description: error.message });
    },
  });
}
