import { redirect } from '@sveltejs/kit'
import { queryUser } from '$lib/server/services/supabase'
import { log } from '$lib/utils/logging'
import { errorReason, isRedirect } from '$lib/utils/error'
import type { PageServerLoad } from './$types'
import { isDevelopment } from '$lib/config/env'
import { url } from '$lib/utils/url'

export const load = (async ({ params: { id }, request }) => {
  try {
    const domains = ['shopify.com']
    const { staging } = url.buildContext(request.url)

    if (isDevelopment || staging) {
      domains.push('gmail.com')
    }

    const user = await queryUser(id, ...domains)
    log('[id]', { user })

    throw redirect(307, user.url)
  } catch (error) {
    if (isRedirect(error)) throw error

    log('[id]', error, 'E')
    throw redirect(307, `/?error=${id}&reason=${errorReason(error)}`)
  }
}) satisfies PageServerLoad
