import type { Metadata } from "next";
import { Calendar, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate, getInitials } from "@/lib/utils";

export const metadata: Metadata = { title: "Assiduidade" };

const TODAY = new Date().toISOString();
const MOCK_ATTENDANCE = [
  { id: "1", name: "Atchutchi Ferreira", checkIn: "08:02", checkOut: null, status: "present" },
  { id: "2", name: "Alpha Ibrahima Ndiaye", checkIn: "08:45", checkOut: null, status: "late" },
  { id: "3", name: "Binta Djalo Silva", checkIn: "08:00", checkOut: "17:30", status: "present" },
  { id: "4", name: "Hedner Fonseca", checkIn: null, checkOut: null, status: "absent" },
  { id: "5", name: "Idrissa", checkIn: "09:10", checkOut: null, status: "late" },
];

const STATUS_MAP = {
  present: { label: "Presente", variant: "success" as const },
  late: { label: "Atrasado", variant: "warning" as const },
  absent: { label: "Ausente", variant: "destructive" as const },
};

export default function AttendancePage() {
  const stats = {
    present: MOCK_ATTENDANCE.filter((a) => a.status === "present").length,
    late: MOCK_ATTENDANCE.filter((a) => a.status === "late").length,
    absent: MOCK_ATTENDANCE.filter((a) => a.status === "absent").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Assiduidade</h1>
        <p className="text-sm text-muted-foreground">
          Registo de presenças — {formatDate(TODAY)}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Presentes</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-bold text-green-600">{stats.present}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Atrasados</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-bold text-yellow-600">{stats.late}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ausentes</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-bold text-red-600">{stats.absent}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4 text-[#4CC88A]" />
            Equipa — Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_ATTENDANCE.map((member) => {
              const status = STATUS_MAP[member.status as keyof typeof STATUS_MAP];
              return (
                <div
                  key={member.id}
                  className="flex items-center gap-4 rounded-lg p-3 hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-[#4CC88A] text-white text-xs">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.checkIn ? `Entrada: ${member.checkIn}` : "Sem registo de entrada"}
                      {member.checkOut && ` · Saída: ${member.checkOut}`}
                    </p>
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
