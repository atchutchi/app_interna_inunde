import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Histórico de Chamadas" };

export default function CallHistoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Histórico de Chamadas</h1>
      <Card>
        <CardHeader>
          <CardTitle>Todas as chamadas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Tabela de chamadas — conectar ao Supabase</p>
        </CardContent>
      </Card>
    </div>
  );
}
