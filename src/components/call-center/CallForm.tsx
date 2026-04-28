"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DELIVERY_ZONES, CALL_OUTCOME_OPTIONS } from "@/lib/constants";
import { registerCall } from "@/app/(dashboard)/call-center/actions";

const callSchema = z.object({
  customer_phone: z.string().min(7, "Telefone obrigatório"),
  customer_name: z.string().optional(),
  zone: z.string().optional(),
  order_type: z.string().optional(),
  outcome: z.enum(["converted", "failed", "info", "complaint", "no_answer"]),
  notes: z.string().optional(),
});

type CallFormData = z.infer<typeof callSchema>;

export function CallForm() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CallFormData>({
    resolver: zodResolver(callSchema),
    defaultValues: { outcome: "converted" },
  });

  const outcome = useWatch({ control, name: "outcome" });

  async function onSubmit(data: CallFormData) {
    const result = await registerCall(data);

    if (result.error) {
      toast.error("Erro ao registar chamada", { description: result.error });
      return;
    }

    toast.success("Chamada registada!", {
      description:
        data.outcome === "converted"
          ? "Chamada convertida em entrega."
          : `Resultado: ${data.outcome}`,
    });
    reset();
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-[#4CC88A]" />
          Registar Chamada
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Phone */}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="customer_phone">
                Telefone do cliente <span className="text-destructive">*</span>
              </Label>
              <Input
                id="customer_phone"
                type="tel"
                placeholder="+245 966 000 000"
                autoFocus
                className="h-11 text-lg"
                {...register("customer_phone")}
              />
              {errors.customer_phone && (
                <p className="text-xs text-destructive">{errors.customer_phone.message}</p>
              )}
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="customer_name">Nome do cliente</Label>
              <Input id="customer_name" placeholder="Nome" {...register("customer_name")} />
            </div>

            {/* Zone */}
            <div className="space-y-2">
              <Label>Zona de entrega</Label>
              <Select onValueChange={(v) => setValue("zone", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar zona" />
                </SelectTrigger>
                <SelectContent>
                  {DELIVERY_ZONES.map((zone) => (
                    <SelectItem key={zone} value={zone}>
                      {zone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Order type */}
            <div className="space-y-2">
              <Label htmlFor="order_type">Tipo de pedido</Label>
              <Input
                id="order_type"
                placeholder="Ex: iComida, iEntrega"
                {...register("order_type")}
              />
            </div>

            {/* Outcome */}
            <div className="space-y-2">
              <Label>
                Resultado <span className="text-destructive">*</span>
              </Label>
              <Select
                defaultValue="converted"
                onValueChange={(v) => setValue("outcome", v as CallFormData["outcome"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CALL_OUTCOME_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Input id="notes" placeholder="Observações adicionais..." {...register("notes")} />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-none">
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />A registar...
                </>
              ) : (
                <>
                  <CheckCircle2 />
                  Registar Chamada
                </>
              )}
            </Button>

            {outcome === "converted" && (
              <Button type="button" variant="outline" className="border-[#4CC88A] text-[#4CC88A]">
                + Criar Entrega
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
