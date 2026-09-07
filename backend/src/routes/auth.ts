import { Router, Request, Response, NextFunction } from 'express'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { verifyToken } from '../middleware/auth.js'

export const authRoutes = Router()

const auth = getAuth()
const db = getFirestore()

interface AuthRequest extends Request {
  user?: {
    uid: string
    email: string
  }
}

// Register endpoint
authRoutes.post('/register', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { email, password, displayName } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    })

    // Create user document in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: displayName || '',
      createdAt: new Date().getTime(),
      lastLogin: new Date().getTime(),
    })

    const token = await auth.createCustomToken(userRecord.uid)

    res.status(201).json({
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
      },
      token,
    })
  } catch (error: any) {
    next(error)
  }
})

// Login endpoint
authRoutes.post('/login', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    // Get user by email
    const userRecord = await auth.getUserByEmail(email)

    // Create custom token
    const token = await auth.createCustomToken(userRecord.uid)

    // Update last login
    await db.collection('users').doc(userRecord.uid).update({
      lastLogin: new Date().getTime(),
    })

    res.json({
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
      },
      token,
    })
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    next(error)
  }
})

// Get current user profile
authRoutes.get('/profile', verifyToken, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const userDoc = await db.collection('users').doc(req.user.uid).get()

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(userDoc.data())
  } catch (error: any) {
    next(error)
  }
})

// Update profile
authRoutes.put('/profile', verifyToken, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { displayName, photoURL } = req.body

    await db.collection('users').doc(req.user.uid).update({
      displayName: displayName || '',
      photoURL: photoURL || '',
      updatedAt: new Date().getTime(),
    })

    res.json({ message: 'Profile updated successfully' })
  } catch (error: any) {
    next(error)
  }
})
