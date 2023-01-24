import { redirect } from '@sveltejs/kit';
import {loadRedirect} from '$lib/server/redirect'
import type { RequestEvent } from './$types';

export async function load({params: {id}}: RequestEvent) {
  const result = await loadRedirect(id)

  if (!result || !result.url) {
    throw redirect(307, `/?error=${id}`)
  }

  throw redirect(307, result.url)
}
