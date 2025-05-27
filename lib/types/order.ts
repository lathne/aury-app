export interface Order {
  id: string
  address: string
  status: 'pending' | 'accepted' | 'completed' | 'rejected'
  customer: string
  items: string[]
  timestamp?: number
}