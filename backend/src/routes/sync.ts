import { Router, Request, Response, NextFunction } from 'express'
import { getFirestore } from 'firebase-admin/firestore'

export const syncRoutes = Router()

const db = getFirestore()

interface SyncRequest extends Request {
  user?: {
    uid: string
    email: string
  }
}

// Get sync data
syncRoutes.get('/data', async (req: SyncRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const docRef = db.collection('sync').doc(req.user.uid).collection('data').doc('preferences')
    const doc = await docRef.get()

    if (!doc.exists) {
      return res.json({
        preferences: {
          theme: 'auto',
          language: 'pt-BR',
          notifications: true,
        },
      })
    }

    res.json(doc.data())
  } catch (error: any) {
    next(error)
  }
})

// Update sync data
syncRoutes.post('/data', async (req: SyncRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { preferences, profile } = req.body

    const docRef = db.collection('sync').doc(req.user.uid).collection('data').doc('preferences')
    await docRef.set(
      {
        preferences: preferences || {},
        profile: profile || {},
        updatedAt: new Date().getTime(),
      },
      { merge: true }
    )

    res.json({ message: 'Sync data updated successfully' })
  } catch (error: any) {
    next(error)
  }
})

// Get all user data
syncRoutes.get('/user-data', async (req: SyncRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const userDoc = await db.collection('users').doc(req.user.uid).get()
    const syncDoc = await db
      .collection('sync')
      .doc(req.user.uid)
      .collection('data')
      .doc('preferences')
      .get()

    res.json({
      user: userDoc.data(),
      sync: syncDoc.data(),
    })
  } catch (error: any) {
    next(error)
  }
})
