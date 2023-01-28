import { config } from '$lib/config'
import { data } from '$lib/data'
import { log } from '$lib/utils/logging'
import { url } from '$lib/utils/url'
import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js'
import { api } from './api'

export const auth = {
  async login() {
    try {
      const client = await createClient()
      await client.loginWithPopup()

      const authToken = await client.getIdTokenClaims()
      if (!authToken || !authToken.__raw || !authToken.email) {
        return {}
      }

      const { staging } = url.buildContext(window.location.href)
      const { id, domain } = verifyEmail(authToken.email, staging)

      const response = await api.login(authToken.__raw)
      log('login', { id, domain, response })

      return { verifiedEmail: authToken.email }
    } catch (error) {
      log('login', error, 'E')

      return { error }
    }
  },
  async logout() {
    try {
      await api.logout()

      const client = await createClient(true)
      const { origin } = url.buildContext(window.location.href)
      await client.logout({
        logoutParams: {
          returnTo: origin,
        },
      })

      return {}
    } catch (error) {
      log('logout', error, 'E')

      return { error }
    }
  },
}

export function verifyEmail(email: string, staging: boolean) {
  const match = /^(?<id>.+)@(?<domain>.+)$/.exec(email)
  if (!match || !match.groups) {
    throw new Error(`invalid user email: ${email}`)
  }

  const { id = undefined, domain = undefined } = match.groups
  if (!id || !domain) {
    throw new Error(`invalid user email format: ${email}`)
  } else if (!data.domains(staging).get(domain)) {
    throw new Error(`invalid user email domain: ${domain || email}`)
  }

  return { id, domain }
}

function createClient(fast = false) {
  if (fast) return new Auth0Client(config.auth0)

  return createAuth0Client(config.auth0)
}
