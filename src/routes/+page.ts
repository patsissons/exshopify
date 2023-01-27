import type { PageLoad } from './$types'

export const load = (async ({ url }) => {
  const invalidRedirect = url.searchParams.get('error')

  return { invalidRedirect }
}) satisfies PageLoad
