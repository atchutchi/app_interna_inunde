import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { USER_ROLES } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import type { UserRole } from "@/types/app.types";

export const metadata: Metadata = { title: "Utilizadores" };

const MOCK_USERS = [
  { id: "1", name: "Atchutchi Ferreira", email: "atchutchi@inunde.app", role: "ceo" as UserRole, status: "active" },
  { id: "2", name: "Alpha Ibrahima Ndiaye", email: "alpha@inunde.app", role: "admin" as UserRole, status: "active" },
  { id: "3", name: "Binta Djalo Silva", email: "binta@inunde.app", role: "finance" as UserRole, status: "active" },
  { id: "4", name: "Hedner Fonseca", email: "hedner@inunde.app", role: "operations" as UserRole, status: "active" },
  { id: "5", name: "Idrissa", email: "idrissa@inunde.app", role: "support" as UserRole, status: "active" },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Utilizadores</h1>
          <p className="text-sm text-muted-foreground">Gerir membros da equipa (acesso por convite)</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Convidar Utilizador
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_USERS.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#4CC88A] text-white text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{USER_ROLES[user.role]}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="success">Activo</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
