import { errorReason, isHttpError } from '$lib/utils/error'
import { log } from '$lib/utils/logging'
import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST = (async ({ cookies }) => {
  try {
    log('POST /api/auth/logout')
    cookies.delete('token', { path: '/' })

    return json({})
  } catch (err) {
    log('POST /api/auth/logout', err, 'E')
    if (isHttpError(err)) throw err

    throw error(500, errorReason(err))
  }
}) satisfies RequestHandler
