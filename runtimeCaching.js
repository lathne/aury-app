// Estratégias Workbox prontas para Next.js
const { nextImage, staticResource, googleFonts, apiJSON } = {
  // Stale-while-revalidate para static/JS/CSS
  staticResource: {
    urlPattern: ({ request }) =>
      ["script", "style", "worker"].includes(request.destination),
    handler: "StaleWhileRevalidate",
    options: { cacheName: "static-resources" },
  },

  // Imagens otimizadas pelo <Image>
  nextImage: {
    urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "next-image",
      expiration: { maxEntries: 60, maxAgeSeconds: 14 * 24 * 60 * 60 },
    },
  },

  // Google Fonts
  googleFonts: {
    urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
    handler: "CacheFirst",
    options: {
      cacheName: "google-fonts",
      expiration: { maxEntries: 20, maxAgeSeconds: 365 * 24 * 60 * 60 },
    },
  },

  // Chamadas /api/** que retornam JSON
  apiJSON: {
    urlPattern: /\/api\/.*\/*.json/,
    handler: "NetworkFirst",
    options: {
      cacheName: "api-cache",
      networkTimeoutSeconds: 10,
      expiration: { maxEntries: 50, maxAgeSeconds: 5 * 60 },
    },
  },
};

module.exports = [staticResource, nextImage, googleFonts, apiJSON];
