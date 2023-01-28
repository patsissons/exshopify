export interface UrlContext {
  href: string
  origin: string
  subdomain?: string
  staging: boolean
  root: string
}

export const url = {
  buildContext(href: string): UrlContext {
    const url = new URL(href)
    const parts = url.host.split('.')
    const subdomain = parts.length === 3 ? parts.shift() : undefined
    const staging = subdomain === 'staging'
    const root = 'exshopify.com'

    return {
      href,
      origin: url.origin,
      subdomain,
      staging,
      root,
    }
  },
}
