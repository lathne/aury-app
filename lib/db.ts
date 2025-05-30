import { openDB } from 'idb'
import type { AuthData } from '@/lib/types/auth'
import type { Order } from '@/lib/types/order'

const DB_NAME = 'delivery-app-db'
const DB_VERSION = 1

export async function initDB() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('orders')) {
        db.createObjectStore('orders', { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains('auth')) {
        db.createObjectStore('auth', { keyPath: 'id' })
      }
    },
  })
  return db
}

export async function saveOrder(order: Order) {
  const db = await initDB()
  await db.put('orders', {
    ...order,
    timestamp: Date.now()
  })
}

export async function getOrders(): Promise<Order[]> {
  const db = await initDB()
  return db.getAll('orders')
}

export async function deleteOrder(orderId: string): Promise<void> {
  const db = await initDB()
  const tx = db.transaction('orders', 'readwrite')
  await tx.objectStore('orders').delete(orderId)
  await tx.done
}

export async function saveAuthData(data: AuthData): Promise<void> {
  const db = await initDB()
  await db.put('auth', data)
}

export async function getAuthData(): Promise<AuthData[]> {
  const db = await initDB()
  return db.getAll('auth')
}