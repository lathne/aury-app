'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { Sun, Moon, User, LogOut } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { logout } from '@/lib/features/authSlice'

export function Header() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    router.push('/auth/login')
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Aury App</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/profile')}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}