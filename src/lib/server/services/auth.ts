import { verify, type JwtPayload } from 'jsonwebtoken'
import { PUBLIC_KEY } from '$lib/config/env'
import { verifyEmail } from '$lib/services/auth'
import { log } from '$lib/utils/logging'

export function verifyToken(token: string, staging: boolean) {
  if (!PUBLIC_KEY) {
    throw new Error('unable to verify token')
  }

  const details = verify(token, PUBLIC_KEY)
  if (typeof details === 'string') {
    throw new Error('invalid token verification format')
  }

  if (!hasEmail(details)) {
    throw new Error('invalid token verification')
  }

  const { id, domain } = verifyEmail(details.email, staging)

  log('verifyToken', { id })

  return { id, domain }
}

function hasEmail(value: JwtPayload): value is { email: string } {
  return 'email' in value && typeof value.email === 'string'
}
