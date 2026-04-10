import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Entrar",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4CC88A]">
          <span className="font-heading text-lg font-bold text-white">IN</span>
        </div>
        <span className="font-heading text-xl font-bold text-[#1A1A2E]">INUNDE OPS</span>
        <span className="text-sm text-muted-foreground">Plataforma interna</span>
      </div>
      {children}
    </div>
  );
}
