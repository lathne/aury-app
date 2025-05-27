'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration)
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md p-6 space-y-6 shadow-lg bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Delivery App
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Bem-vindo ao aplicativo para entregadores
        </p>
        <div className="space-y-4">
          <Button
            className="w-full"
            onClick={() => router.push('/auth/login')}
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push('/auth/register')}
          >
            Cadastrar
          </Button>
        </div>
      </Card>
    </main>
  )
}