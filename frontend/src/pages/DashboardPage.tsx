import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useSyncStore } from '../store/syncStore'
import { Header } from '../components/Header'
import { WorldClock } from '../components/WorldClock'

export function DashboardPage() {
  const { user } = useAuthStore()
  const { initializeSync } = useSyncStore()

  useEffect(() => {
    if (user) {
      const unsubscribe = initializeSync(user.uid)
      return unsubscribe
    }
  }, [user, initializeSync])

  return (
    <div className="app-container min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Welcome Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Bem-vindo! 👋
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Sua aplicação está sincronizada em tempo real entre todos os seus dispositivos.
            </p>
          </div>

          {/* World Clock */}
          <WorldClock />

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 card-shadow">
              <div className="text-4xl mb-3">🔐</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Autenticação Segura
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Login seguro com Firebase Authentication
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 card-shadow">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Sincronização em Tempo Real
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Dados sincronizados automaticamente entre abas e dispositivos
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 card-shadow">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Cross-Device
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Acesse de qualquer dispositivo com suas preferências sincronizadas
              </p>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-2xl font-bold mb-4">Informações do Usuário</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-indigo-100 text-sm">Email</p>
                <p className="text-lg font-semibold">{user?.email}</p>
              </div>
              <div>
                <p className="text-indigo-100 text-sm">ID do Usuário</p>
                <p className="text-sm font-mono break-all">{user?.uid}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
