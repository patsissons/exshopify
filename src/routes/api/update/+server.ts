import { verifyToken } from '$lib/server/services/auth'
import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST = (async ({ cookies, request }) => {
  const { url } = await request.json()
  if (!url) {
    throw error(422, 'missing url')
  }

  const token = cookies.get('token')
  if (!token) {
    throw error(401, 'Unauthorized')
  }

  const id = verifyToken(token)

  console.log('POST /api/update', { url, token, id })

  return json({ url })
}) satisfies RequestHandler
