import { redirect } from '@sveltejs/kit'
import { loadRecord } from '$lib/server/services/data'
import type { PageServerLoad } from './$types'

export const load = (async ({ params: { id } }) => {
  const result = await loadRecord(id)

  if (!result || !result.url) {
    throw redirect(307, `/?error=${id}`)
  }

  throw redirect(307, result.url)
}) satisfies PageServerLoad
