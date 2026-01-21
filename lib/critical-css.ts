/**
 * CSS Crítico - Carregado inline no <head> para evitar bloqueio de renderização
 * Contém apenas estilos essenciais para o primeiro viewport
 */

export const criticalCSS = `
  /* CSS Variables - Necessário para tema funcionar */
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --border: 214.3 31.8% 91.4%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
  }

  /* Reset e estilos básicos */
  *,
  ::before,
  ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: hsl(var(--border));
  }

  html {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -moz-tab-size: 4;
    tab-size: 4;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  body {
    margin: 0;
    line-height: inherit;
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }

  /* Estilos críticos para primeiro viewport */
  .flex {
    display: flex;
  }

  .min-h-screen {
    min-height: 100vh;
  }

  .items-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .flex-col {
    flex-direction: column;
  }

  /* Prevent layout shift */
  .p-4 {
    padding: 1rem;
  }

  .w-full {
    width: 100%;
  }

  /* Skeleton para loading */
  .skeleton {
    animation: skeleton-loading 1s linear infinite alternate;
    background: linear-gradient(90deg, hsl(var(--muted)) 25%, hsl(var(--background)) 50%, hsl(var(--muted)) 75%);
    background-size: 200% 100%;
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
