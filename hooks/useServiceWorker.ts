import { useEffect, useState } from "react";
import { Workbox } from "workbox-window";

export function useServiceWorker() {
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const wb = new Workbox("/sw.js");
      wb.addEventListener("waiting", (event: any) => setWaiting(event?.sw));
      wb.register();
    }
  }, []);

  const update = () => waiting?.postMessage({ type: "SKIP_WAITING" });

  return { waiting, update };
}
