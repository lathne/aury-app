import { getGoogleMapsApiKey } from "./map-config";

/**
 * Converte um endereço em coordenadas geográficas (latitude e longitude).
 * @param address O endereço a ser geocodificado.
 * @returns Um objeto com lat e lng, ou null se a geocodificação falhar.
 */
export async function geocodeAddress(
  address: string
): Promise<{ lat: number; lng: number } | null> {
  const apiKey = getGoogleMapsApiKey();
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      console.error("Geocoding failed:",data  , "data.status:",data.status,"data.error_message:", data.error_message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    return null;
  }
}