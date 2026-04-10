import * as React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import type { KPIData } from "@/types/app.types";

interface KPICardProps {
  data: KPIData;
  className?: string;
}

export function KPICard({ data, className }: KPICardProps) {
  const { label, value, trend, unit, format = "number" } = data;

  function formatValue(val: number) {
    if (format === "currency") return formatCurrency(val);
    if (format === "percent") return formatPercent(val / 100);
    return val.toLocaleString("pt-PT");
  }

  const trendPositive = trend !== undefined && trend > 0;
  const trendNegative = trend !== undefined && trend < 0;
  const trendNeutral = trend === undefined || trend === 0;

  return (
    <Card
      className={cn(
        "hover:-translate-y-0.5 hover:shadow-md transition-all duration-150",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {!trendNeutral && (
          <div
            className={cn(
              "flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-semibold",
              trendPositive && "bg-green-100 text-green-700",
              trendNegative && "bg-red-100 text-red-700"
            )}
          >
            {trendPositive && <TrendingUp className="h-3 w-3" />}
            {trendNegative && <TrendingDown className="h-3 w-3" />}
            {trend !== undefined && `${Math.abs(trend).toFixed(1)}%`}
          </div>
        )}
        {trendNeutral && trend === 0 && (
          <div className="flex items-center gap-1 rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-semibold text-gray-600">
            <Minus className="h-3 w-3" />
            0%
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="font-heading text-2xl font-bold animate-count-up">
          {formatValue(value)}
          {unit && <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>}
        </div>
        {trend !== undefined && (
          <p className="mt-1 text-xs text-muted-foreground">
            {trendPositive ? "+" : ""}{trend.toFixed(1)}% vs período anterior
          </p>
        )}
      </CardContent>
    </Card>
  );
}
