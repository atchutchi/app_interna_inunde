import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

// ─── Types ────────────────────────────────────────────────────────────────────

type FinancialEntry = Database["public"]["Tables"]["financial_entries"]["Row"];
type Debt = Database["public"]["Tables"]["debts"]["Row"];
type ShareholderCapital = Database["public"]["Tables"]["shareholder_capital"]["Row"];

export type { FinancialEntry, Debt, ShareholderCapital };

export interface FinanceSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  pendingApprovals: number;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getFinanceSummary(): Promise<FinanceSummary> {
  const supabase = createClient();

  const { data: entries, error } = await supabase
    .from("financial_entries")
    .select("amount, entry_type, status");

  if (error) throw new Error(`Erro ao carregar resumo financeiro: ${error.message}`);

  const approved = (entries ?? []).filter((e) => e.status === "approved");
  const totalIncome = approved
    .filter((e) => e.entry_type === "income")
    .reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = approved
    .filter((e) => e.entry_type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);
  const pendingApprovals = (entries ?? []).filter((e) => e.status === "pending").length;

  return {
    totalIncome,
    totalExpenses,
    netBalance: totalIncome - totalExpenses,
    pendingApprovals,
  };
}

export async function getIncomeEntries(): Promise<FinancialEntry[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("financial_entries")
    .select("*")
    .eq("entry_type", "income")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw new Error(`Erro ao carregar entradas: ${error.message}`);
  return data ?? [];
}

export async function getExpenseEntries(): Promise<FinancialEntry[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("financial_entries")
    .select("*")
    .eq("entry_type", "expense")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw new Error(`Erro ao carregar saídas: ${error.message}`);
  return data ?? [];
}

export async function getDebts(): Promise<Debt[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("debts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw new Error(`Erro ao carregar dívidas: ${error.message}`);
  return data ?? [];
}

export async function getShareholderCapital(): Promise<ShareholderCapital[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("shareholder_capital")
    .select("*")
    .order("entry_date", { ascending: false })
    .limit(100);

  if (error) throw new Error(`Erro ao carregar capital dos sócios: ${error.message}`);
  return data ?? [];
}
