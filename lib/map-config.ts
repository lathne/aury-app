interface MapConfig {
  apiKey: string;
  originAddress: string;
}

export function getMapConfig(): MapConfig {
  return {
    apiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      "AIzaSyAa9gEB4-NlxKUpeU9S5DigsASsoY0PEak",
    originAddress:
      process.env.NEXT_PUBLIC_ORIGIN_ADDRESS ||
      "R. Galvão Costa, 755 - Centro, Santa Cruz do Sul - RS, 96180-198",
  };
}

export function getGoogleMapsApiKey(): string {
  return getMapConfig().apiKey;
}

export function getOriginAddress(): string {
  return getMapConfig().originAddress;
}
