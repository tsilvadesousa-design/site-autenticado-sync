import { create } from 'zustand'
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { useAuthStore } from './authStore'
import type { SyncData } from '../types'

const db = getFirestore()

interface SyncStoreState {
  syncData: SyncData | null
  isLoading: boolean
  error: string | null
  updateSyncData: (data: Partial<SyncData>) => Promise<void>
  initializeSync: (userId: string) => () => void
}

export const useSyncStore = create<SyncStoreState>((set) => ({
  syncData: null,
  isLoading: false,
  error: null,

  updateSyncData: async (data: Partial<SyncData>) => {
    const user = useAuthStore.getState().user
    if (!user) return

    try {
      set({ isLoading: true, error: null })
      const docRef = doc(db, 'sync', user.uid, 'data', 'preferences')
      await setDoc(docRef, { ...data }, { merge: true })
    } catch (error: any) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },

  initializeSync: (userId: string) => {
    const docRef = doc(db, 'sync', userId, 'data', 'preferences')

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          set({ syncData: snapshot.data() as SyncData, error: null })
        }
      },
      (error) => {
        set({ error: error.message })
      }
    )

    return unsubscribe
  },
}))
