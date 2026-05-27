import { createContext, useContext, useEffect, useState } from 'react'
import { pb } from '../lib/pocketbase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If PocketBase has a stored session but the browser was closed (sessionStorage cleared),
    // treat it as a new session and force logout.
    if (pb.authStore.isValid && !sessionStorage.getItem('adminSession')) {
      pb.authStore.clear()
    }

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
      sessionStorage.setItem('adminSession', 'active')
      return { error: null }
    } catch (err) {
      return { error: err }
    }
  }

  const signOut = () => {
    sessionStorage.removeItem('adminSession')
    pb.authStore.clear()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
