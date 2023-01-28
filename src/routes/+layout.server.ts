import { queryUser } from '$lib/server/services/supabase'
import { verifyEmail } from '$lib/services/auth'
import { log } from '$lib/utils/logging'
import { url } from '$lib/utils/url'
import type { IdToken } from '@auth0/auth0-spa-js'
import jwt from 'jsonwebtoken'
import type { LayoutServerLoad } from './$types'

export const load = (async ({ cookies, request }) => {
  const urlContext = url.buildContext(request.url)

  try {
    const token = cookies.get('token')
    if (!token) return { urlContext }

    const authToken = jwt.decode(token) as IdToken
    if (!authToken.email) return { urlContext }

    const { id, domain } = verifyEmail(authToken.email, urlContext.staging)
    const user = await queryUser(id, domain)

    log('index', { token, user, authToken })

    return {
      id,
      verifiedEmail: authToken.email,
      user,
      urlContext,
    }
  } catch (err) {
    log('index', err, 'E')
    return { urlContext }
  }
}) satisfies LayoutServerLoad
