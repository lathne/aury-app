'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

interface MapViewProps {
  deliveries: Array<{
    id: string
    address: string
    lat: number
    lng: number
  }>
}

export function MapView({ deliveries }: MapViewProps) {
  const [isMapLoading, setIsMapLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="w-full h-[500px] overflow-hidden relative">
      {isMapLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {deliveries.length} entregas disponíveis
              </p>
              <ul className="text-left space-y-2">
                {deliveries.map((delivery) => (
                  <li key={delivery.id} className="text-sm">
                    📍 {delivery.address}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}