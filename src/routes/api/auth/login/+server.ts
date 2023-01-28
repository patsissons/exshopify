import { verifyToken } from '$lib/server/services/auth'
import { errorReason, isHttpError } from '$lib/utils/error'
import { log } from '$lib/utils/logging'
import { url } from '$lib/utils/url'
import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST = (async ({ cookies, request }) => {
  try {
    const { token } = await request.json()
    if (!token) {
      throw error(422, 'missing token')
    }

    const { staging } = url.buildContext(request.url)
    if (!verifyToken(token, staging)) {
      throw error(422, 'invalid token')
    }

    log('POST /api/auth/login', { token })
    cookies.set('token', token, { path: '/' })

    return json({ token })
  } catch (err) {
    log('POST /api/auth/login', err, 'E')
    if (isHttpError(err)) throw err

    throw error(500, errorReason(err))
  }
}) satisfies RequestHandler
