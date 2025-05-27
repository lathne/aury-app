import { configureStore } from '@reduxjs/toolkit'
import ordersReducer from './features/ordersSlice'
import authReducer from './features/authSlice'

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch