// components/map.tsx

"use client";

import { Card } from "@/components/ui/card";
import { getGoogleMapsApiKey, getOriginAddress } from "@/lib/map-config";
import type { DeliveryLocation } from "@/lib/types/delivery";

interface MapProps {
  selectedDelivery: DeliveryLocation | null;
}

export function Map({ selectedDelivery }: MapProps) {
  if (!selectedDelivery) {
    return (
      <Card className="p-4 h-[500px] bg-gray-100">
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">Selecione uma entrega para ver o mapa</p>
        </div>
      </Card>
    );
  }

  const address = encodeURIComponent(selectedDelivery.address);
  const apiKey = getGoogleMapsApiKey();
  const originAddress = encodeURIComponent(getOriginAddress());

  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${originAddress}&destination=${address}`;

  return (
    <Card className="p-4 h-[500px] bg-gray-100">
      <div className="h-full flex items-center justify-center">
        <iframe
          width="100%"
          height="500"
          frameBorder="0"
          style={{ border: 0 }}
          src={mapUrl}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
          title="Mapa da entrega"
        />
      </div>
    </Card>
  );
}
