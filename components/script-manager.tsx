/**
 * Script Manager Component
 * Gerencia o carregamento assíncrono de scripts não-críticos
 */

import Script from 'next/script';

export function ScriptManager() {
  return (
    <>
      {/* Service Worker - Carregado após interação */}
      <Script
        id="service-worker-registration"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(
                  (registration) => {
                    console.log('Service Worker registrado:', registration);
                  },
                  (err) => {
                    console.error('Erro ao registrar Service Worker:', err);
                  }
                );
              });
            }
          `,
        }}
      />

      {/* Web Vitals - Monitoramento de performance */}
      <Script
        id="web-vitals"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var vitalsUrl = 'https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js';
              var script = document.createElement('script');
              script.src = vitalsUrl;
              script.async = true;
              script.onload = function() {
                webVitals.onCLS(console.log);
                webVitals.onFID(console.log);
                webVitals.onLCP(console.log);
              };
              document.head.appendChild(script);
            })();
          `,
        }}
      />
    </>
  );
}
