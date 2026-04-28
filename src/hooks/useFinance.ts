"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database.types";
import type { EntryType, EntryStatus } from "@/types/app.types";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

type FinancialEntry = Database["public"]["Tables"]["financial_entries"]["Row"];
type FinancialEntryInsert = Database["public"]["Tables"]["financial_entries"]["Insert"];

const FINANCIAL_ENTRY_COLUMNS = `
  id,
  entry_type,
  category,
  subcategory,
  vertical,
  origin,
  amount,
  currency,
  payment_method,
  reference_id,
  reference_type,
  description,
  receipt_url,
  status,
  created_by,
  approved_by,
  approved_at,
  created_at,
  updated_at,
  tenant_id
`;

interface FinanceFilter {
  entryType?: EntryType;
  status?: EntryStatus;
  category?: string;
  page?: number;
  fromDate?: string;
  toDate?: string;
}

export function useFinancialEntries(filter: FinanceFilter = {}) {
  const supabase = createClient();
  const { page = 1, entryType, status, category, fromDate, toDate } = filter;

  return useQuery({
    queryKey: ["financial_entries", filter],
    queryFn: async () => {
      let query = supabase
        .from("financial_entries")
        .select(FINANCIAL_ENTRY_COLUMNS, { count: "exact" })
        .order("created_at", { ascending: false })
        .range((page - 1) * DEFAULT_PAGE_SIZE, page * DEFAULT_PAGE_SIZE - 1);

      if (entryType) query = query.eq("entry_type", entryType);
      if (status) query = query.eq("status", status);
      if (category) query = query.eq("category", category);
      if (fromDate) query = query.gte("created_at", fromDate);
      if (toDate) query = query.lte("created_at", toDate);

      const { data, error, count } = await query;
      if (error) throw error;
      return { data: data as FinancialEntry[], total: count ?? 0 };
    },
  });
}

export function useFinanceSummary(month?: string) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["finance_summary", month],
    queryFn: async () => {
      const startDate = month ? `${month}-01` : new Date(new Date().setDate(1)).toISOString();
      const endDate = month
        ? new Date(
            new Date(startDate).setMonth(new Date(startDate).getMonth() + 1) - 1
          ).toISOString()
        : new Date().toISOString();

      const { data, error } = await supabase
        .from("financial_entries")
        .select("entry_type, amount, status")
        .eq("status", "approved")
        .gte("created_at", startDate)
        .lte("created_at", endDate);

      if (error) throw error;

      const income = (data ?? [])
        .filter((e) => e.entry_type === "income")
        .reduce((sum, e) => sum + e.amount, 0);

      const expenses = (data ?? [])
        .filter((e) => e.entry_type === "expense")
        .reduce((sum, e) => sum + e.amount, 0);

      return { income, expenses, net: income - expenses };
    },
  });
}

export function useCreateFinancialEntry() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entry: Omit<FinancialEntryInsert, "tenant_id">) => {
      const { data, error } = await supabase
        .from("financial_entries")
        .insert(entry as FinancialEntryInsert)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["financial_entries"] });
      queryClient.invalidateQueries({ queryKey: ["finance_summary"] });
      toast.success("Registo financeiro criado!");
    },
    onError: (error: Error) => {
      toast.error("Erro ao criar registo", { description: error.message });
    },
  });
}
