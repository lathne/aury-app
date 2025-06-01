'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { updateOrder, deleteOrder } from '@/lib/db'
import { useDeliveries } from '@/hooks/use-db'
import type { Order } from '@/lib/types/order'
import type { DeliveryLocation } from '@/lib/types/delivery'


interface OrderListProps {
  onAccept?: (location: DeliveryLocation) => void;
}

export function OrderList({ onAccept }: OrderListProps) {
const { deliveries, loading, error, refetch } = useDeliveries()

const handleAcceptOrder = async (orderId: string) => {
    try {
      await updateOrder(orderId, { status: 'accepted' })
     const accepted = deliveries.find(d => d.id === orderId)
      if (accepted && onAccept) {
        const deliveryLocation: DeliveryLocation = {
          id: accepted.id,
          address: accepted.address,
          lat: -23.550520 + Math.random() * 0.1, 
          lng: -46.633308 + Math.random() * 0.1  
        }
        onAccept(deliveryLocation)
      }
      await refetch()
    } catch (err) {
      console.error('Failed to accept order:', err)
    }
  }

  const handleRejectOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId) 
      await refetch()            
    } catch (err) {
      console.error('Failed to reject order:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        Error loading orders: {error}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {deliveries.map((order: Order) => (
        <Card key={order.id} className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{order.customer}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {order.address}
              </p>
              <div className="mt-2">
                <p className="text-sm font-medium">Itens:</p>
                <ul className="text-sm text-gray-600 dark:text-gray-300">
                  {order.items.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              {/* Status do pedido */}
                <div className="mt-2">
                  <span
                    className={
                      order.status === 'pending'
                        ? 'text-yellow-600'
                        : order.status === 'accepted'
                        ? 'text-green-600'
                        : order.status === 'completed'
                        ? 'text-blue-600'
                        : 'text-red-600'
                    }
                  >
                    Status: {order.status === 'pending'
                      ? 'Pendente'
                      : order.status === 'accepted'
                      ? 'Aceito'
                      : order.status === 'completed'
                      ? 'Concluído'
                      : 'Recusado'}
                  </span>
                </div>
            </div>
            <div className="space-y-2">
              <Button
                size="sm"
                className="w-full"
                onClick={() => handleAcceptOrder(order.id)}
              >
                Aceitar
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="w-full"
                onClick={() => handleRejectOrder(order.id)}
              >
                Recusar
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}