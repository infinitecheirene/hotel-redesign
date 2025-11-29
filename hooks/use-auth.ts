import { useState, useEffect } from "react"

interface User {
  id: number
  first_name: string
  last_name: string
  name: string
  email: string
  phone: string
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      })

      if (!response.ok) {
        setState({ user: null, loading: false, error: null })
        return
      }

      const data = await response.json()
      
      if (data.success && data.data?.user) {
        setState({ user: data.data.user, loading: false, error: null })
      } else {
        setState({ user: null, loading: false, error: null })
      }
    } catch (error) {
      setState({ user: null, loading: false, error: "Failed to fetch user" })
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      setState({ user: null, loading: false, error: null })
      window.location.href = "/login"
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    logout,
    refetch: fetchUser,
  }
}