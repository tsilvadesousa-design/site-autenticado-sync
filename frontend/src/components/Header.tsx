import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useSyncStore } from '../store/syncStore'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="dashboard-header border-b border-white border-opacity-20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-indigo-600">
            🔐
          </div>
          <h1 className="text-2xl font-bold text-white">Meu Site Autenticado</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-white text-sm">
            <p className="font-semibold">{user?.displayName || user?.email}</p>
            <p className="text-white text-opacity-70">Sincronizado ✓</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-smooth font-medium"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}
