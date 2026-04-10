import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, isValid, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

/** Tailwind class merger — shadcn/ui standard */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as XOF currency.
 * e.g. formatCurrency(6500) → "6.500 XOF"
 */
export function formatCurrency(amount: number, currency: "XOF" | "EUR" = "XOF"): string {
  if (currency === "EUR") {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount);
  }

  const formatted = new Intl.NumberFormat("pt-PT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `${formatted} XOF`;
}

/**
 * Format a date string as DD/MM/YYYY (Guiné-Bissau locale).
 * e.g. formatDate("2026-04-09") → "09/04/2026"
 */
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "—";

  const d = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(d)) return "—";

  return format(d, "dd/MM/yyyy");
}

/**
 * Format a datetime string.
 * e.g. formatDateTime("2026-04-09T14:30:00") → "09/04/2026 às 14h30"
 */
export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return "—";

  const d = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(d)) return "—";

  return format(d, "dd/MM/yyyy 'às' HH'h'mm");
}

/**
 * Format a phone number in Guiné-Bissau format.
 * e.g. formatPhone("966123456") → "+245 966 123 456"
 */
export function formatPhone(phone: string | null | undefined): string {
  if (!phone) return "—";

  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("245") && digits.length === 12) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
  }

  if (digits.length === 9) {
    return `+245 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  return phone;
}

/**
 * Relative time — e.g. "há 3 horas"
 */
export function formatRelative(date: string | Date | null | undefined): string {
  if (!date) return "—";

  const d = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(d)) return "—";

  return formatDistanceToNow(d, { addSuffix: true, locale: ptBR });
}

/**
 * Format a percentage — e.g. formatPercent(0.756) → "75.6%"
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Truncate a string to a max length with ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 3)}...`;
}

/**
 * Get initials from a full name — e.g. "Alpha Ibrahima" → "AI"
 */
export function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

/**
 * Calculate trend percentage between current and previous values.
 * Returns a signed percentage — positive = growth.
 */
export function calcTrend(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}
