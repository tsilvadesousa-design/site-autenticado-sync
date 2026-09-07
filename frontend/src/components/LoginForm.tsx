import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const { login, register, error, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isRegister) {
        await register(email, password)
      } else {
        await login(email, password)
      }
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
        {isRegister ? 'Criar Conta' : 'Fazer Login'}
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        {isRegister
          ? 'Crie sua conta para começar'
          : 'Entre com suas credenciais'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="seu@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="••••••••"
            required
          />
        </div>

        {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-smooth disabled:opacity-50"
        >
          {isLoading ? 'Processando...' : isRegister ? 'Criar Conta' : 'Entrar'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          {isRegister ? 'Já tem conta? Fazer login' : 'Não tem conta? Criar agora'}
        </button>
      </div>
    </div>
  )
}
