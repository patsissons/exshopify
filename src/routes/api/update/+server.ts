import { verifyToken } from '$lib/server/services/auth'
import { updateUser } from '$lib/server/services/supabase'
import { errorReason, isHttpError } from '$lib/utils/error'
import { log } from '$lib/utils/logging'
import { url } from '$lib/utils/url'
import { error, json } from '@sveltejs/kit'
import jwt from 'jsonwebtoken'
import type { RequestHandler } from './$types'

export const POST = (async ({ cookies, request }) => {
  try {
    const input = await request.json()
    if (!input.url) {
      throw error(422, 'missing url')
    }

    const token = cookies.get('token')
    if (!token) {
      throw error(401, 'Unauthorized')
    }

    const { staging } = url.buildContext(request.url)
    const { id, domain } = verifyToken(token, staging)

    log('POST /api/update', { input, token, id })

    const user = await updateUser(id, domain, input.url)

    return json({ user })
  } catch (err) {
    log('POST /api/update', err, 'E')

    if (err instanceof jwt.TokenExpiredError) {
      cookies.delete('token', { path: '/' })
      throw error(401, 'Unauthorized')
    }

    if (isHttpError(err)) throw error

    throw error(500, errorReason(err))
  }
}) satisfies RequestHandler
