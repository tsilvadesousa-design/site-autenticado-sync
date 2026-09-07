import { Request, Response, NextFunction } from 'express'
import { getAuth } from 'firebase-admin/auth'

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string
    email: string
  }
}

export async function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1]

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const auth = getAuth()
    const decodedToken = await auth.verifyIdToken(token)

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
    }

    next()
  } catch (error: any) {
    res.status(401).json({ error: 'Invalid token' })
  }
}
