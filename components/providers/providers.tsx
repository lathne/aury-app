"use client";

import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";
import { store } from "@/lib/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ToastProvider />
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}
