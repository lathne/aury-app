import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Wifi, WifiOff } from "lucide-react";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

interface OfflineMapProps {
  selectedDelivery?: {
    id: string;
    address: string;
    lat?: number;
    lng?: number;
  } | null;
}

export function OfflineMap({ selectedDelivery }: OfflineMapProps) {
  const isOnline = useNetworkStatus();
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    // Tentar obter localização do usuário (funciona offline)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Erro ao obter localização:", error);
        },
      );
    }
  }, []);

  const openInMaps = () => {
    if (selectedDelivery && userLocation) {
      const destination = encodeURIComponent(selectedDelivery.address);
      const origin = `${userLocation.lat},${userLocation.lng}`;
      
      // Tenta abrir no Google Maps (requer internet)
      if (isOnline) {
        window.open(
          `https://www.google.com/maps/dir/${origin}/${destination}`,
          '_blank'
        );
      } else {
        // Fallback para app nativo de mapas
        window.open(
          `geo:${selectedDelivery.lat || 0},${selectedDelivery.lng || 0}?q=${destination}`,
          '_blank'
        );
      }
    }
  };

  return (
    <div className="h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
      <Image
        src="/maps/offline-map-placeholder.svg"
        alt="Mapa offline"
        fill
        className="object-cover opacity-60"
        priority
      />
      {/* Status da conexão */}
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 dark:bg-gray-900/90 px-2 py-1 rounded text-xs">
        {isOnline ? (
          <>
            <Wifi className="h-3 w-3 text-green-500" />
            <span className="text-green-600">Online</span>
          </>
        ) : (
          <>
            <WifiOff className="h-3 w-3 text-red-500" />
            <span className="text-red-600">Offline</span>
          </>
        )}
      </div>

      {selectedDelivery ? (
        <div className="text-center space-y-4 relative z-10 px-4">
          <MapPin className="h-12 w-12 text-blue-600 mx-auto" />
          <div>
            <h3 className="font-medium">Entrega Selecionada</h3>
            <p className="text-sm text-gray-600 mt-1">{selectedDelivery.address}</p>
          </div>
          
          <div className="space-y-2">
            <Button onClick={openInMaps} className="w-full">
              <Navigation className="h-4 w-4 mr-2" />
              {isOnline ? "Abrir no Google Maps" : "Abrir no Mapa Nativo"}
            </Button>
            
            {userLocation && (
              <div className="text-xs text-gray-500">
                Sua localização: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4 relative z-10 px-4">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto" />
          <div>
            <h3 className="font-medium text-gray-600">Nenhuma entrega selecionada</h3>
            <p className="text-sm text-gray-500">
              {isOnline 
                ? "Selecione um pedido para ver no mapa" 
                : "Mapas limitados no modo offline"
              }
            </p>
          </div>
        </div>
      )}

      {!isOnline && (
        <div className="absolute bottom-2 left-2 right-2 bg-yellow-100/90 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 text-xs p-2 rounded">
          Modo offline: Funcionalidades de mapa limitadas
        </div>
      )}
    </div>
  );
};
