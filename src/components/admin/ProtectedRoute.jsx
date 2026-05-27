import { Navigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary-500" />
      </div>
    )
  }

  if (!user) return <Navigate to="/admin/login" replace />

  return children
}
