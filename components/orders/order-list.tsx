'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDeliveries } from '@/hooks/use-db'
import { updateOrderStatus, removeOrder } from '@/lib/features/ordersSlice'
import type { Order } from '@/lib/types/order'

export function OrderList() {
  const { deliveries, loading, error } = useDeliveries()

  const handleAcceptOrder = async (orderId: string) => {
    try {
      await updateOrderStatus({ id: orderId, status: 'accepted' })
    } catch (err) {
      console.error('Failed to accept order:', err)
    }
  }

  const handleRejectOrder = async (orderId: string) => {
    try {
      await removeOrder(orderId)
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