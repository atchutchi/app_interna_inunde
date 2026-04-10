import type {
  VerticalType,
  DeliveryStatus,
  DeliverySource,
  IncomeCategory,
  ExpenseCategory,
  PaymentMethod,
  UserRole,
  PartnerType,
  CallOutcome,
  RiderExpenseType,
  DebtStatus,
  EntryStatus,
} from "@/types/app.types";

// ─── Verticals ───────────────────────────────────────────────────────────────

export const VERTICALS: Record<
  VerticalType,
  { label: string; color: string; icon: string; description: string }
> = {
  icomida: {
    label: "iComida",
    color: "#FF6B35",
    icon: "UtensilsCrossed",
    description: "Food delivery",
  },
  ientrega: {
    label: "iEntrega",
    color: "#3B82F6",
    icon: "Package",
    description: "Logística on-demand",
  },
  ieventos: {
    label: "iEventos",
    color: "#F59E0B",
    icon: "Ticket",
    description: "Bilheteira digital",
  },
  ilugares: {
    label: "iLugares",
    color: "#8B5CF6",
    icon: "MapPin",
    description: "Guia turístico",
  },
};

export const VERTICAL_OPTIONS = Object.entries(VERTICALS).map(([value, { label }]) => ({
  value: value as VerticalType,
  label,
}));

// ─── Delivery Zones ───────────────────────────────────────────────────────────

export const DELIVERY_ZONES = [
  "Coqueiro",
  "Bandim",
  "Praça",
  "Reno",
  "Brá",
  "Pluba",
  "Belém",
  "Antula",
  "Hafia",
  "Mindara",
  "Bairro Militar",
  "Terra Nova",
  "Bissaque",
  "Bô-Lama",
  "Militar",
] as const;

export type DeliveryZone = (typeof DELIVERY_ZONES)[number];

// ─── Delivery Prices (iEntrega) ──────────────────────────────────────────────

export const DELIVERY_PRICES = [
  { label: "0–1 km", minKm: 0, maxKm: 1, price: 500 },
  { label: "1–3,5 km", minKm: 1, maxKm: 3.5, price: 1000 },
  { label: "3,5–6 km", minKm: 3.5, maxKm: 6, price: 1250 },
  { label: "6–10 km", minKm: 6, maxKm: 10, price: 1500 },
  { label: "10–12 km", minKm: 10, maxKm: 12, price: 2500 },
  { label: "12–14 km", minKm: 12, maxKm: 14, price: 3000 },
] as const;

// ─── Delivery Statuses ───────────────────────────────────────────────────────

export const DELIVERY_STATUSES: Record<
  DeliveryStatus,
  { label: string; color: string; bgColor: string; description: string }
> = {
  received: {
    label: "Recebido",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    description: "Pedido recebido",
  },
  preparing: {
    label: "Em Preparação",
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
    description: "A preparar o pedido",
  },
  assigned: {
    label: "Atribuído",
    color: "text-purple-700",
    bgColor: "bg-purple-100",
    description: "Motoboy atribuído",
  },
  in_route: {
    label: "Em Rota",
    color: "text-orange-700",
    bgColor: "bg-orange-100",
    description: "Motoboy a caminho",
  },
  completed: {
    label: "Concluído",
    color: "text-green-700",
    bgColor: "bg-green-100",
    description: "Entrega concluída",
  },
  failed: {
    label: "Falhado",
    color: "text-red-700",
    bgColor: "bg-red-100",
    description: "Entrega falhada",
  },
  cancelled: {
    label: "Cancelado",
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    description: "Entrega cancelada",
  },
  refunded: {
    label: "Reembolsado",
    color: "text-indigo-700",
    bgColor: "bg-indigo-100",
    description: "Valor reembolsado",
  },
};

export const DELIVERY_STATUS_OPTIONS = Object.entries(DELIVERY_STATUSES).map(
  ([value, { label }]) => ({ value: value as DeliveryStatus, label })
);

// ─── Delivery Sources ────────────────────────────────────────────────────────

export const DELIVERY_SOURCES: Record<DeliverySource, string> = {
  app: "App INUNDE",
  call_center: "Call Center",
  partner: "Parceiro",
  b2b: "B2B",
  terra_e_mar: "Terra e Mar",
  other: "Outro",
};

export const DELIVERY_SOURCE_OPTIONS = Object.entries(DELIVERY_SOURCES).map(
  ([value, label]) => ({ value: value as DeliverySource, label })
);

// ─── Finance Categories ──────────────────────────────────────────────────────

export const INCOME_CATEGORIES: Record<IncomeCategory, string> = {
  vendas_app: "Vendas via App",
  vendas_call_center: "Vendas Call Center",
  entregas_externas: "Entregas Externas",
  comissoes_parceiros: "Comissões de Parceiros",
  receitas_icomida: "Receitas iComida",
  receitas_ientrega: "Receitas iEntrega",
  receitas_ilugares: "Receitas iLugares",
  receitas_ieventos: "Receitas iEventos",
  injecao_socio: "Injecção de Sócio",
  outras_receitas: "Outras Receitas",
};

export const EXPENSE_CATEGORIES: Record<ExpenseCategory, string> = {
  combustivel: "Combustível",
  manutencao: "Manutenção",
  salarios: "Salários",
  incentivos_motoboys: "Incentivos Motoboys",
  marketing_ads: "Marketing & Ads",
  licencas_software: "Licenças de Software",
  internet_telecom: "Internet & Telecom",
  pagamento_restaurantes: "Pagamento a Restaurantes",
  pagamento_parceiros: "Pagamento a Parceiros",
  reembolsos: "Reembolsos",
  despesas_administrativas: "Despesas Administrativas",
  equipamento: "Equipamento",
  outras_despesas: "Outras Despesas",
};

export const INCOME_CATEGORY_OPTIONS = Object.entries(INCOME_CATEGORIES).map(
  ([value, label]) => ({ value: value as IncomeCategory, label })
);

export const EXPENSE_CATEGORY_OPTIONS = Object.entries(EXPENSE_CATEGORIES).map(
  ([value, label]) => ({ value: value as ExpenseCategory, label })
);

// ─── Payment Methods ─────────────────────────────────────────────────────────

export const PAYMENT_METHODS: Record<PaymentMethod, string> = {
  orange_money: "Orange Money",
  teletaku: "Teletaku (Telecel)",
  cash: "Numerário (Cash)",
  transfer: "Transferência Bancária",
  other: "Outro",
};

export const PAYMENT_METHOD_OPTIONS = Object.entries(PAYMENT_METHODS).map(
  ([value, label]) => ({ value: value as PaymentMethod, label })
);

// ─── Entry Statuses ──────────────────────────────────────────────────────────

export const ENTRY_STATUSES: Record<EntryStatus, { label: string; color: string }> = {
  pending: { label: "Pendente", color: "text-yellow-700" },
  approved: { label: "Aprovado", color: "text-green-700" },
  rejected: { label: "Rejeitado", color: "text-red-700" },
};

// ─── Call Outcomes ───────────────────────────────────────────────────────────

export const CALL_OUTCOMES: Record<CallOutcome, string> = {
  converted: "Convertida em Entrega",
  failed: "Não Convertida",
  info: "Apenas Informação",
  complaint: "Reclamação",
  no_answer: "Não Atendeu",
};

export const CALL_OUTCOME_OPTIONS = Object.entries(CALL_OUTCOMES).map(([value, label]) => ({
  value: value as CallOutcome,
  label,
}));

// ─── Rider Expense Types ─────────────────────────────────────────────────────

export const RIDER_EXPENSE_TYPES: Record<RiderExpenseType, string> = {
  fuel: "Combustível",
  maintenance: "Manutenção",
  other: "Outro",
};

// ─── Debt Statuses ───────────────────────────────────────────────────────────

export const DEBT_STATUSES: Record<DebtStatus, { label: string; color: string }> = {
  pending: { label: "Pendente", color: "text-yellow-700" },
  partial: { label: "Parcialmente Pago", color: "text-blue-700" },
  settled: { label: "Liquidado", color: "text-green-700" },
  cancelled: { label: "Cancelado", color: "text-gray-700" },
};

// ─── Partner Types ───────────────────────────────────────────────────────────

export const PARTNER_TYPES: Record<PartnerType, string> = {
  restaurant: "Restaurante",
  supplier: "Fornecedor",
  b2b_delivery: "Entrega B2B",
  events: "Eventos",
  corporate: "Corporativo",
};

// ─── User Roles ──────────────────────────────────────────────────────────────

export const USER_ROLES: Record<UserRole, string> = {
  admin: "Administrador",
  ceo: "CEO",
  board_member: "Conselho de Administração",
  finance: "Financeiro",
  operations: "Operações",
  call_center: "Call Center",
  motorbike: "Motoboy",
  marketing: "Marketing",
  auditor: "Auditor",
  support: "Suporte",
};

// ─── Finance approval threshold (XOF) ────────────────────────────────────────

export const APPROVAL_THRESHOLD_XOF = 50_000;
export const RECEIPT_REQUIRED_THRESHOLD_XOF = 20_000;

// ─── Pagination ──────────────────────────────────────────────────────────────

export const DEFAULT_PAGE_SIZE = 20;
