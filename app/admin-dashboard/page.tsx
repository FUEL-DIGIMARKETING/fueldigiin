'use client'

import { useEffect, useState } from 'react'
import AdminDashboard from '@/components/admin/AdminDashboard'
import { AuthUser } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function AdminDashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          router.push('/admin-login')
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        router.push('/admin-login')
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    )
  }

  return <AdminDashboard user={user} />
}