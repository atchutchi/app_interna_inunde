"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database.types";
import type { DeliveryStatus } from "@/types/app.types";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

type Delivery = Database["public"]["Tables"]["deliveries"]["Row"];
type DeliveryInsert = Database["public"]["Tables"]["deliveries"]["Insert"];

interface DeliveriesFilter {
  status?: DeliveryStatus;
  riderId?: string;
  zone?: string;
  page?: number;
}

export function useDeliveries(filter: DeliveriesFilter = {}) {
  const supabase = createClient();
  const { page = 1, status, riderId, zone } = filter;

  return useQuery({
    queryKey: ["deliveries", filter],
    queryFn: async () => {
      let query = supabase
        .from("deliveries")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((page - 1) * DEFAULT_PAGE_SIZE, page * DEFAULT_PAGE_SIZE - 1);

      if (status) query = query.eq("status", status);
      if (riderId) query = query.eq("rider_id", riderId);
      if (zone) query = query.eq("delivery_zone", zone);

      const { data, error, count } = await query;
      if (error) throw error;
      return { data: data as Delivery[], total: count ?? 0 };
    },
  });
}

export function useCreateDelivery() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (delivery: Omit<DeliveryInsert, "tenant_id">) => {
      const { data, error } = await supabase.from("deliveries").insert(delivery as DeliveryInsert).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
      toast.success("Entrega criada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error("Erro ao criar entrega", { description: error.message });
    },
  });
}

export function useUpdateDeliveryStatus() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: DeliveryStatus }) => {
      const now = new Date().toISOString();
      const timestamps: Partial<Delivery> = {};

      if (status === "assigned") timestamps.assigned_at = now;
      if (status === "in_route") timestamps.departed_at = now;
      if (status === "completed" || status === "failed") timestamps.completed_at = now;

      const { data, error } = await supabase
        .from("deliveries")
        .update({ status, ...timestamps, updated_at: now })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
    },
    onError: (error: Error) => {
      toast.error("Erro ao actualizar estado", { description: error.message });
    },
  });
}
