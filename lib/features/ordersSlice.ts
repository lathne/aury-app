import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Order } from '@/lib/types/order'

interface OrdersState {
  items: Order[]
  loading: boolean
  error: string | null
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.items.push(action.payload)
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
      const order = state.items.find(item => item.id === action.payload.id)
      if (order) {
        order.status = action.payload.status
      }
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  setOrders,
  addOrder,
  updateOrderStatus,
  removeOrder,
  setLoading,
  setError,
} = ordersSlice.actions

export default ordersSlice.reducer