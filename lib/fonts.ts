/**
 * Configuração Otimizada de Fontes
 * 
 * Estratégias implementadas:
 * 1. font-display: swap - Evita FOIT (Flash of Invisible Text)
 * 2. preload: true - Prioriza carregamento
 * 3. adjustFontFallback: true - Minimiza layout shift
 * 4. Subset específico - Reduz tamanho do arquivo
 */

import { Inter } from "next/font/google";
import localFont from "next/font/local";

/**
 * Fonte principal do app - Inter (Google Fonts)
 */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  // Carrega apenas os pesos necessários
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

/**
 * Fonte local como fallback (opcional)
 * Útil para carregamento offline
 */
export const systemFont = localFont({
  src: [
    {
      path: "../public/fonts/fallback-font.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-system",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/**
 * CSS Variables para uso no Tailwind
 */
export const fontVariables = `${inter.variable}`;
