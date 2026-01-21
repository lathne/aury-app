/**
 * Providers Otimizados
 * 
 * Estratégia:
 * 1. Redux Provider - Crítico, carrega imediatamente
 * 2. Theme Provider - Importante, mas pode ter delay mínimo
 * 3. Toast Provider - Não-crítico, lazy load
 */

"use client";

import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "./theme-provider";
import { store } from "@/lib/store";
import dynamic from "next/dynamic";

// Toast Provider com lazy loading (não é crítico para primeira renderização)
const ToastProvider = dynamic(
  () => import("./toast-provider").then((mod) => mod.ToastProvider),
  {
    ssr: false,
  }
);

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        {/* Toast carregado após conteúdo principal */}
        <ToastProvider />
      </ThemeProvider>
    </ReduxProvider>
  );
}
