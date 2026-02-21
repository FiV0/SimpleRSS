import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import supabase from "@/supabase"
import type { User } from "@supabase/supabase-js"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }
    getSession()
  }, [])

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}
