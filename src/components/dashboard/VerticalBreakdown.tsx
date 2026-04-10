"use client";

import * as React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VERTICALS } from "@/lib/constants";
import type { VerticalType } from "@/types/app.types";

interface VerticalData {
  vertical: VerticalType;
  value: number;
  count: number;
}

interface VerticalBreakdownProps {
  data: VerticalData[];
}

export function VerticalBreakdown({ data }: VerticalBreakdownProps) {
  const chartData = data.map((d) => ({
    name: VERTICALS[d.vertical].label,
    value: d.value,
    color: VERTICALS[d.vertical].color,
    count: d.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Receita por Vertical</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value.toLocaleString("pt-PT")} XOF`]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
              formatter={(value) => <span style={{ color: "#374151" }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Summary list */}
        <div className="mt-2 space-y-1.5">
          {data.map((d) => {
            const vertical = VERTICALS[d.vertical];
            return (
              <div key={d.vertical} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: vertical.color }}
                  />
                  <span className="text-muted-foreground">{vertical.label}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-muted-foreground">{d.count} entregas</span>
                  <span className="font-semibold">{d.value.toLocaleString("pt-PT")} XOF</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
