import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: { default: "INUNDE Motoboy", template: "%s | INUNDE Motoboy" },
};

export default async function RiderPortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-svh flex-col bg-gray-50">
      {/* Simple mobile header */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-[#1A1A2E] px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4CC88A]">
            <span className="font-heading text-xs font-bold text-white">IN</span>
          </div>
          <span className="font-heading text-sm font-bold text-white">Motoboy</span>
        </div>
      </header>

      <main className="flex-1 p-4">{children}</main>

      {/* Bottom navigation */}
      <nav className="sticky bottom-0 flex border-t bg-white">
        <a
          href="/my-deliveries"
          className="flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium text-[#4CC88A]"
        >
          <span className="text-lg">📦</span>
          Entregas
        </a>
        <a
          href="/my-expenses"
          className="flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium text-muted-foreground"
        >
          <span className="text-lg">💰</span>
          Despesas
        </a>
      </nav>
    </div>
  );
}
