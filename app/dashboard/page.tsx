'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { OrderList } from '@/components/orders/order-list'
import { MapView } from '@/components/map/map-view'
import { Header } from '@/components/layout/header'
import { CreateOrderForm } from '@/components/orders/create-order-form'
import { useDeliveries } from '@/hooks/use-db'

type DeliveryLocation = {
  id: string
  address: string
  lat: number
  lng: number
}

export default function Dashboard() {
  const [isOnline, setIsOnline] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { deliveries, loading, error } = useDeliveries()
  const [deliveryLocations, setDeliveryLocations] = useState<DeliveryLocation[]>([])
  const [hasMounted, setHasMounted] = useState(false)

 useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (hasMounted) {
      setDeliveryLocations(
        deliveries.map(delivery => ({
          id: delivery.id,
          address: delivery.address,
          lat: -23.550520 + Math.random() * 0.1,
          lng: -46.633308 + Math.random() * 0.1
        }))
      )
    }
  }, [deliveries, hasMounted])

  if (!hasMounted) {
    // Optionally, show a loading spinner or skeleton here
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto p-4">
        {!isOnline && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
            Você está offline. Algumas funcionalidades podem estar limitadas.
          </div>
        )}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Pedidos</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Pedido
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar Novo Pedido</DialogTitle>
              </DialogHeader>
              <CreateOrderForm onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h2 className="text-xl font-bold mb-4">Pedidos Disponíveis</h2>
            <OrderList />
          </Card>
          <Card className="p-4">
            <h2 className="text-xl font-bold mb-4">Mapa de Entregas</h2>
            <MapView deliveries={deliveryLocations} />
          </Card>
        </div>
      </main>
    </div>
  )
}