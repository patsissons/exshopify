import { verifyToken } from '$lib/server/services/auth'
import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST = (async ({ cookies, request }) => {
  const { token } = await request.json()
  if (!token) {
    throw error(422, 'missing token')
  }

  if (!verifyToken(token)) {
    throw error(422, 'invalid token')
  }

  console.log('POST /api/auth', { token })
  cookies.set('token', token)

  return json({ token })
}) satisfies RequestHandler
