// ─── Roles ───────────────────────────────────────────────────────────────────

export type UserRole =
  | "admin"
  | "ceo"
  | "board_member"
  | "finance"
  | "operations"
  | "call_center"
  | "motorbike"
  | "marketing"
  | "auditor"
  | "support";

// ─── Verticals ───────────────────────────────────────────────────────────────

export type VerticalType = "icomida" | "ientrega" | "ieventos" | "ilugares";

// ─── Delivery ────────────────────────────────────────────────────────────────

export type DeliveryStatus =
  | "received"
  | "preparing"
  | "assigned"
  | "in_route"
  | "completed"
  | "failed"
  | "cancelled"
  | "refunded";

export type DeliverySource = "app" | "call_center" | "partner" | "b2b" | "terra_e_mar" | "other";

// ─── Finance ─────────────────────────────────────────────────────────────────

export type EntryType = "income" | "expense" | "transfer";

export type PaymentMethod =
  | "orange_money"
  | "teletaku"
  | "cash"
  | "transfer"
  | "other";

export type EntryStatus = "pending" | "approved" | "rejected";

export type IncomeCategory =
  | "vendas_app"
  | "vendas_call_center"
  | "entregas_externas"
  | "comissoes_parceiros"
  | "receitas_icomida"
  | "receitas_ientrega"
  | "receitas_ilugares"
  | "receitas_ieventos"
  | "injecao_socio"
  | "outras_receitas";

export type ExpenseCategory =
  | "combustivel"
  | "manutencao"
  | "salarios"
  | "incentivos_motoboys"
  | "marketing_ads"
  | "licencas_software"
  | "internet_telecom"
  | "pagamento_restaurantes"
  | "pagamento_parceiros"
  | "reembolsos"
  | "despesas_administrativas"
  | "equipamento"
  | "outras_despesas";

// ─── Call Center ─────────────────────────────────────────────────────────────

export type CallOutcome = "converted" | "failed" | "info" | "complaint" | "no_answer";

// ─── Partners ────────────────────────────────────────────────────────────────

export type PartnerType =
  | "restaurant"
  | "supplier"
  | "b2b_delivery"
  | "events"
  | "corporate";

export type PartnerStatus = "active" | "inactive" | "pending";

// ─── Riders ──────────────────────────────────────────────────────────────────

export type RiderStatus = "active" | "inactive" | "suspended";

export type RiderExpenseType = "fuel" | "maintenance" | "other";

// ─── Debts ───────────────────────────────────────────────────────────────────

export type DebtDirection = "receivable" | "payable";

export type DebtorType = "customer" | "partner" | "rider" | "shareholder" | "other";

export type DebtStatus = "pending" | "partial" | "settled" | "cancelled";

// ─── Shareholder Capital ─────────────────────────────────────────────────────

export type CapitalEntryType = "investment" | "loan" | "operational_cover";

export type ReimbursementStatus = "pending" | "partial" | "completed" | "waived";

// ─── UI helpers ──────────────────────────────────────────────────────────────

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface KPIData {
  label: string;
  value: number;
  previousValue?: number;
  unit?: string;
  format?: "currency" | "number" | "percent";
  trend?: number;
  vertical?: VerticalType;
}
