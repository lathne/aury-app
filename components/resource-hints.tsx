/**
 * Resource Hints Component
 * 
 * Implementa:
 * - preconnect: Conexões antecipadas com origens externas
 * - dns-prefetch: Resolução DNS antecipada
 * - preload: Recursos críticos prioritários
 * - prefetch: Recursos para próximas navegações
 */

export function ResourceHints() {
  return (
    <>
      {/* Google Fonts - Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* DNS Prefetch para recursos externos */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

      {/* Preload de recursos críticos */}
      <link
        rel="preload"
        href="/manifest.json"
        as="fetch"
        crossOrigin="anonymous"
      />

      {/* Prefetch de rotas comuns (carregamento antecipado) */}
      <link rel="prefetch" href="/auth/login" />
      <link rel="prefetch" href="/dashboard" />

      {/* Preload de ícones críticos */}
      <link rel="preload" href="/icons/icon-192x192.png" as="image" />
    </>
  );
}

/**
 * Resource Hints para páginas específicas
 */
export function DashboardResourceHints() {
  return (
    <>
      {/* Prefetch de recursos do mapa (para dashboard) */}
      <link rel="prefetch" href="/maps/" as="fetch" />
      
      {/* DNS prefetch para serviços de mapa */}
      <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
    </>
  );
}
