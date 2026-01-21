import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { ScriptManager } from "@/components/script-manager";
import { criticalCSS } from "@/lib/critical-css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  // Adiciona preconnect para otimizar carregamento da fonte
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Aury Delivery App",
  description: "Aplicativo de delivery para entregadores",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* CSS Crítico inline para evitar bloqueio de renderização */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        
        {/* Preconnect para Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <ScriptManager />
      </body>
    </html>
  );
}
