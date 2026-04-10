import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Perfil do Parceiro" };

interface PageProps { params: { id: string } }

export default function PartnerDetailPage({ params }: PageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/partners"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <h1 className="font-heading text-2xl font-bold">Perfil do Parceiro</h1>
      </div>
      <Card>
        <CardHeader><CardTitle>Detalhes e transacções</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Conectar ao Supabase com ID: {params.id}</p>
        </CardContent>
      </Card>
    </div>
  );
}
