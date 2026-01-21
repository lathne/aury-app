# 🎯 GUIA PRÁTICO: Implementando Lazy Loading e Code Splitting

## 🗺️ 1. Otimizar Componentes de Mapa (PRIORIDADE ALTA)

### Problema
Mapas são extremamente pesados (~500KB-1MB) e não são necessários na primeira renderização.

### Solução
```typescript
// components/map/offline-map.tsx
'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// ✅ Componente otimizado
const OfflineMapDynamic = dynamic(
  () => import('./offline-map-component'),
  {
    ssr: false, // Não renderizar no servidor
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    ),
  }
);

export default OfflineMapDynamic;
```

**Benefício**: Reduz 500KB-1MB do bundle inicial ⚡

---

## 📊 2. Otimizar Chart.js (PRIORIDADE ALTA)

### Problema
Chart.js é pesado (~230KB) e raramente usado na primeira renderização.

### Solução
```typescript
// components/charts/sales-chart.tsx
'use client';

import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded" />,
});

export function SalesChart({ data }: { data: any }) {
  return <Chart data={data} />;
}
```

**Benefício**: Reduz ~230KB do bundle inicial ⚡

---

## 🎨 3. Otimizar Ícones Lucide (PRIORIDADE MÉDIA)

### ❌ EVITE
```typescript
import * as Icons from 'lucide-react';
// Isso importa TODOS os ícones (~500KB)
```

### ✅ FAÇA
```typescript
// Importe apenas os ícones necessários
import { 
  User, 
  Settings, 
  LogOut, 
  Menu,
  ChevronDown 
} from 'lucide-react';
```

**Benefício**: Reduz até 400KB dependendo do uso ⚡

---

## 🎭 4. Otimizar Modais e Dialogs (PRIORIDADE MÉDIA)

### Problema
Dialogs complexos que raramente são abertos.

### Solução
```typescript
// components/orders/create-order-dialog.tsx
'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const CreateOrderForm = dynamic(
  () => import('./create-order-form'),
  { loading: () => <div>Carregando formulário...</div> }
);

export function CreateOrderDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Criar Pedido
      </Button>
      
      {open && <CreateOrderForm onClose={() => setOpen(false)} />}
    </>
  );
}
```

**Benefício**: Carrega código apenas quando necessário ⚡

---

## 📱 5. Otimizar Componentes Radix UI

### Já otimizado automaticamente! ✅
O Next.js config já inclui:
```javascript
experimental: {
  optimizePackageImports: [
    "@radix-ui/react-accordion",
    "@radix-ui/react-dialog",
    // ... outros
  ]
}
```

**Nada a fazer aqui** - Next.js cuida disso automaticamente.

---

## 🖼️ 6. Otimizar Imagens

### ❌ EVITE
```tsx
<img src="/image.jpg" alt="..." />
```

### ✅ FAÇA
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Descrição da imagem"
  width={800}
  height={600}
  loading="lazy"
  quality={75}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // opcional
/>
```

**Benefício**: Lazy loading + otimização automática + WebP ⚡

---

## 🎯 7. Code Splitting por Rota

### Problema
Rotas complexas carregam muito JS.

### Solução
```typescript
// app/dashboard/page.tsx
import dynamic from 'next/dynamic';

// Componentes pesados carregados dinamicamente
const OrdersList = dynamic(() => import('@/components/orders/order-list'));
const OrdersChart = dynamic(() => import('@/components/charts/orders-chart'), {
  ssr: false
});
const Map = dynamic(() => import('@/components/map/offline-map'), {
  ssr: false
});

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <OrdersList />
      <OrdersChart />
      <Map />
    </div>
  );
}
```

**Benefício**: Cada componente é um chunk separado ⚡

---

## 📦 8. Otimizar Third-Party Scripts

### Google Analytics, Facebook Pixel, etc.

```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        
        {/* ✅ Carrega após interação do usuário */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
```

**Benefício**: Scripts de terceiros não bloqueiam renderização ⚡

---

## 🔄 9. Otimizar Redux/Estado Global

### Problema
Store grande carregado mesmo quando não necessário.

### Solução
```typescript
// lib/store.ts
import { configureStore } from '@reduxjs/toolkit';

// Lazy load reducers
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: require('./features/authSlice').default,
      // Carregar apenas quando necessário
      // orders: require('./features/ordersSlice').default,
    },
  });
};

// Carregar reducer dinamicamente
export const loadOrdersReducer = async () => {
  const { default: ordersReducer } = await import('./features/ordersSlice');
  return ordersReducer;
};
```

---

## ⚡ 10. Prefetch Estratégico

### Problema
Rotas importantes demoram para carregar.

### Solução
```typescript
import Link from 'next/link';

// ✅ Prefetch automático
<Link href="/dashboard" prefetch={true}>
  Dashboard
</Link>

// ❌ Desabilitar para rotas raramente acessadas
<Link href="/admin/settings" prefetch={false}>
  Settings
</Link>
```

---

## 📊 Medindo Resultados

### Antes de implementar
```bash
npm run build
```
Anote os tamanhos em "First Load JS"

### Depois de implementar
```bash
npm run build
```
Compare os resultados!

### Com Bundle Analyzer
```bash
# Windows PowerShell
$env:ANALYZE="true"; npm run build

# Windows CMD
set ANALYZE=true && npm run build
```

---

## 🎯 Prioridade de Implementação

### 🔴 Alta Prioridade (Faça primeiro)
1. ✅ Mapas (offline-map.tsx) - ~500KB-1MB
2. ✅ Chart.js - ~230KB
3. ✅ Ícones Lucide - Até 400KB

### 🟡 Média Prioridade
4. Dialogs e Modais complexos
5. Componentes de formulário pesados
6. Otimização de imagens

### 🟢 Baixa Prioridade (Otimizações finas)
7. Code splitting por rota
8. Third-party scripts
9. Redux lazy loading
10. Prefetch estratégico

---

## ✅ Checklist de Implementação

- [ ] Identificar componentes > 50KB no bundle analyzer
- [ ] Implementar dynamic import nos mapas
- [ ] Implementar dynamic import no Chart.js
- [ ] Corrigir imports de ícones Lucide
- [ ] Otimizar imagens com next/image
- [ ] Lazy load de dialogs raramente abertos
- [ ] Testar build e comparar tamanhos
- [ ] Executar Lighthouse e verificar score

---

## 🚀 Resultado Esperado

### Antes
- First Load JS: ~200-300KB
- Lighthouse Performance: 70-80

### Depois
- First Load JS: ~100-150KB
- Lighthouse Performance: 85-95

### Ganhos
- ⚡ 40-50% redução em JavaScript
- ⚡ 20-30% melhoria em Performance
- ⚡ First Contentful Paint 30-40% mais rápido
- ⚡ Time to Interactive 40-50% mais rápido

---

## 📝 Exemplo Completo

```typescript
// app/dashboard/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// ✅ Componentes críticos - carregamento normal
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';

// ✅ Componentes pesados - lazy loading
const OrdersList = dynamic(
  () => import('@/components/orders/order-list'),
  { loading: () => <Skeleton className="w-full h-64" /> }
);

const OrdersChart = dynamic(
  () => import('@/components/charts/orders-chart'),
  { ssr: false, loading: () => <div>Carregando gráfico...</div> }
);

const Map = dynamic(
  () => import('@/components/map/offline-map'),
  { ssr: false, loading: () => <div>Carregando mapa...</div> }
);

export default function DashboardPage() {
  return (
    <div>
      <Header />
      
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        
        {/* Crítico - carrega imediatamente */}
        <div className="mb-4">
          <Button>Criar Pedido</Button>
        </div>
        
        {/* Importante - lazy loading com skeleton */}
        <Suspense fallback={<Skeleton className="w-full h-64" />}>
          <OrdersList />
        </Suspense>
        
        {/* Menos crítico - lazy loading sem SSR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <OrdersChart />
          <Map />
        </div>
      </main>
    </div>
  );
}
```

Este guia cobre as principais otimizações práticas que você pode implementar imediatamente! 🚀
