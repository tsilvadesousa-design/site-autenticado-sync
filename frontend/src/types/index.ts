export interface User {
  uid: string
  email: string
  displayName?: string
  photoURL?: string
  createdAt: number
  lastLogin: number
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface SyncData {
  preferences: {
    theme: 'light' | 'dark' | 'auto'
    language: string
    notifications: boolean
  }
  profile?: {
    bio: string
    avatar: string
  }
}
