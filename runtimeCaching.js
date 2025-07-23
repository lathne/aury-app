const pageHandler = {
  urlPattern: ({ request }) => request.mode === "navigate",
  handler: "NetworkFirst",
  options: {
    cacheName: "pages",
    networkTimeoutSeconds: 3,
    expiration: { maxEntries: 20, maxAgeSeconds: 24 * 60 * 60 },
  },
};

const localImages = {
  urlPattern: /^\/(icons|screenshots)\/.*\.(png|jpg|jpeg|svg|gif|webp)$/i,
  handler: "CacheFirst",
  options: {
    cacheName: "static-images",
    expiration: { maxEntries: 20, maxAgeSeconds: 30 * 24 * 60 * 60 },
  },
};

const staticResource = {
  urlPattern: ({ request }) =>
    ["script", "style", "worker"].includes(request.destination),
  handler: "StaleWhileRevalidate",
  options: { cacheName: "static-resources" },
};

const nextImage = {
  urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
  handler: "StaleWhileRevalidate",
  options: {
    cacheName: "next-image",
    expiration: { maxEntries: 60, maxAgeSeconds: 14 * 24 * 60 * 60 },
  },
};

const googleFonts = {
  urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
  handler: "CacheFirst",
  options: {
    cacheName: "google-fonts",
    expiration: { maxEntries: 20, maxAgeSeconds: 365 * 24 * 60 * 60 },
  },
};

const apiJSON = {
  urlPattern: /\/api\/.*\/*.json/,
  handler: "NetworkFirst",
  options: {
    cacheName: "api-cache",
    networkTimeoutSeconds: 10,
    expiration: { maxEntries: 50, maxAgeSeconds: 5 * 60 },
  },
};

module.exports = [
  pageHandler,
  localImages,
  staticResource,
  nextImage,
  googleFonts,
  apiJSON,
];