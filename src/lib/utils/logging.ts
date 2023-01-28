import { isDevelopment } from '$lib/config/env'
import { url } from './url'

export function log(message: string, context?: unknown, type = 'D') {
  if (!isDevelopment && typeof window !== 'undefined') {
    const { staging } = url.buildContext(window.location.href)

    // no client side logging in prod
    if (!staging) return
  }

  console.log(`${type} ${message}`, context)
}
