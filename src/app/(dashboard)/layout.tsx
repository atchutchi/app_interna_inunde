import * as React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, avatar_url")
    .eq("id", user.id)
    .single<{ full_name: string; role: string; avatar_url: string | null }>();

  // Riders go to their own portal
  if (profile?.role === "motorbike") {
    redirect("/my-deliveries");
  }

  return (
    <DashboardShell
      userFullName={profile?.full_name ?? user.email ?? undefined}
      userRole={profile?.role ?? undefined}
      userAvatarUrl={profile?.avatar_url ?? undefined}
    >
      {children}
    </DashboardShell>
  );
}
