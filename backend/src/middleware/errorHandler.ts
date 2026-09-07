import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('Error:', err)

  // Firebase errors
  if (err.code?.startsWith('auth/')) {
    return res.status(400).json({
      error: err.message || 'Authentication error',
      code: err.code,
    })
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  })
}
