import redirectsJson from 'data/redirects.json'

export type ID = string

export interface Redirect {
  url: string
  editKey?: string
}

export type Redirects = Record<ID, Redirect | undefined>

const redirects = redirectsJson as Redirects

export async function loadRedirect(id: ID) {
  return redirects[id]
}
