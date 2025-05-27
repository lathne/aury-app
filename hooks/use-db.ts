'use client'

import { useState, useEffect } from 'react'
import { getOrders } from '@/lib/db'
import type { Order } from '@/lib/types/order'

export function useDeliveries() {
  const [deliveries, setDeliveries] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDeliveries() {
      try {
        setLoading(true)
        const orders = await getOrders()
        setDeliveries(orders)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load deliveries')
      } finally {
        setLoading(false)
      }
    }

    loadDeliveries()
  }, [])

  return { deliveries, loading, error }
}