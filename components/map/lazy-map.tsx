/**
 * Lazy Loaded Map Component
 * Mapa é carregado apenas quando necessário, economizando recursos
 */

'use client';

import dynamic from 'next/dynamic';
import { MapSkeleton } from '@/components/lazy-load-wrapper';

// Lazy load do componente de mapa (não carrega no SSR)
export const LazyOfflineMap = dynamic(
  () => import('@/components/map/offline-map').then(mod => mod.OfflineMap),
  {
    ssr: false,
    loading: MapSkeleton,
  }
);

// Re-exporta para manter compatibilidade
export default LazyOfflineMap;
