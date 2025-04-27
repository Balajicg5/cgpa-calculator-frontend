import { createContext, useState, useContext, useEffect } from 'react'
import { loginUser, registerUser, getCurrentUser } from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token')
    if (token) {
      fetchUser(token)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async (token) => {
    try {
      const userData = await getCurrentUser(token)
      setUser(userData.data)
    } catch (err) {
      console.error("Error fetching user data:", err)
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    setError(null)
    try {
      const response = await loginUser({ email, password })
      localStorage.setItem('token', response.token)
      setUser(response.user)
      return true
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
      return false
    }
  }

  const register = async (name, email, password) => {
    setError(null)
    try {
      const response = await registerUser({ name, email, password })
      localStorage.setItem('token', response.token)
      setUser(response.user)
      return true
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}