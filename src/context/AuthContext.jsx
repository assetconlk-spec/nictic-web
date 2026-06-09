import { createContext, useContext, useEffect, useState } from 'react'
import { pb } from '../lib/pocketbase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setUser(pb.authStore.isValid ? pb.authStore.model : null)
    setLoading(false)

    const unsubscribe = pb.authStore.onChange((_token, model) => {
      setUser(model ?? null)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    try {
      await pb.collection('_superusers').authWithPassword(email, password)
      return { error: null }
    } catch (err) {
      return { error: err }
    }
  }

  const signOut = () => {
    pb.authStore.clear()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
