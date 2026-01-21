/**
 * Lazy Load Wrapper
 * Componente reutilizável para lazy loading com skeleton
 */

import dynamic from 'next/dynamic';
import { ComponentType, ReactElement } from 'react';

interface LazyLoadOptions {
  ssr?: boolean;
  loading?: () => ReactElement;
}

/**
 * Skeleton padrão para componentes em carregamento
 */
export function DefaultSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
  );
}

/**
 * Skeleton para mapas
 */
export function MapSkeleton() {
  return (
    <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
      <div className="text-gray-400 dark:text-gray-500">
        Carregando mapa...
      </div>
    </div>
  );
}

/**
 * Skeleton para gráficos
 */
export function ChartSkeleton() {
  return (
    <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
      <div className="text-gray-400 dark:text-gray-500">
        Carregando gráfico...
      </div>
    </div>
  );
}

/**
 * Factory para criar componentes lazy-loaded
 */
export function createLazyComponent<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options?: LazyLoadOptions
) {
  return dynamic(importFn, {
    ssr: options?.ssr ?? false,
    loading: options?.loading ?? DefaultSkeleton,
  });
}
