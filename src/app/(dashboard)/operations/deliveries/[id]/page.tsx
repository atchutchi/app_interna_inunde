import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Detalhe da Entrega" };

interface PageProps {
  params: { id: string };
}

export default function DeliveryDetailPage({ params }: PageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/operations/deliveries">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="font-heading text-2xl font-bold">Entrega #{params.id}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Entrega</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Detalhes completos — conectar ao Supabase com ID: {params.id}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
