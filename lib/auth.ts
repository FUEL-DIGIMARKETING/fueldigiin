import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export interface AuthUser {
  userId: string
  username: string
  role: string
}

export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    return {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role
    }
  } catch (error) {
    return null
  }
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    return {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role
    }
  } catch (error) {
    return null
  }
}