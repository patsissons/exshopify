import { verifyEmail } from '$lib/services/auth'
import { verify, type JwtPayload } from 'jsonwebtoken'

const publicKey = import.meta.env.VITE_PUBLIC_KEY

export function verifyToken(token: string) {
  if (!publicKey) {
    throw new Error('unable to verify token')
  }

  const details = verify(token, publicKey)
  if (typeof details === 'string') {
    throw new Error('invalid token verification format')
  }

  if (!hasEmail(details)) {
    throw new Error('invalid token verification')
  }

  const id = verifyEmail(details.email)

  console.log('D', { id })

  return id
}

function hasEmail(value: JwtPayload): value is { email: string } {
  return 'email' in value && typeof value.email === 'string'
}
