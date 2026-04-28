import type { Metadata, Viewport } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "INUNDE OPS",
    template: "%s | INUNDE OPS",
  },
  description: "Plataforma interna de gestão operacional, financeira e analítica — INUNDE SARL",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4CC88A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${plusJakartaSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
