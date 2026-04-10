"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database.types";

type RiderExpense = Database["public"]["Tables"]["rider_expenses"]["Row"];
type RiderExpenseInsert = Database["public"]["Tables"]["rider_expenses"]["Insert"];

/** Fetch the current rider's active deliveries */
export function useMyDeliveries(riderId: string | undefined) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["my_deliveries", riderId],
    queryFn: async () => {
      if (!riderId) return [];
      const { data, error } = await supabase
        .from("deliveries")
        .select("*")
        .eq("rider_id", riderId)
        .in("status", ["assigned", "in_route"])
        .order("requested_at", { ascending: true });

      if (error) throw error;
      return data;
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
        .select("*")
        .eq("rider_id", riderId)
        .order("expense_date", { ascending: false })
        .limit(20);

      if (error) throw error;
      return data as RiderExpense[];
    },
    enabled: !!riderId,
  });
}

/** Create a new rider expense */
export function useCreateRiderExpense() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense: Omit<RiderExpenseInsert, "tenant_id">) => {
      const { data, error } = await supabase
        .from("rider_expenses")
        .insert(expense as RiderExpenseInsert)
        .select()
        .single();
      if (error) throw error;
      return data;
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
