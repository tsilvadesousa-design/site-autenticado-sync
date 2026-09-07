import { create } from 'zustand'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import type { User, AuthState } from '../types'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

initializeApp(firebaseConfig)
const auth = getAuth()

interface AuthStoreState extends AuthState {
  initializeAuth: () => void
  register: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  initializeAuth: () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || undefined,
          photoURL: firebaseUser.photoURL || undefined,
          createdAt: firebaseUser.metadata.creationTime ? new Date(firebaseUser.metadata.creationTime).getTime() : Date.now(),
          lastLogin: Date.now(),
        }
        set({ user, isLoading: false, error: null })
      } else {
        set({ user: null, isLoading: false })
      }
    })
  },

  register: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null })
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      set({ error: error.message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null })
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      set({ error: error.message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true })
      await signOut(auth)
      set({ user: null })
    } catch (error: any) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
}))
