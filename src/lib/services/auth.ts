import { config } from '$lib/config'
import { data } from '$lib/data'
import { auth as store } from '$lib/stores/auth'
import {
  Auth0Client,
  createAuth0Client,
  type RedirectLoginOptions,
} from '@auth0/auth0-spa-js'
import { api } from './api'

export interface AuthState {
  client?: Auth0Client
  error?: unknown
}

export const auth = {
  async initialize(): Promise<AuthState> {
    try {
      const client = await createClient()
      const id = await authenticate(client)

      console.log('D', { id })
      store.id.set(id)

      return { client }
    } catch (error) {
      console.log('E', error)
      store.id.set(undefined)

      return { error }
    }
  },
  async login(client: Auth0Client, options?: RedirectLoginOptions) {
    try {
      await client.loginWithPopup(options)

      const id = await authenticate(client)

      console.log('D', { id })
      store.id.set(id)

      return { id }
    } catch (error) {
      console.log('E', error)

      return { error }
    }
  },
  async logout(client: Auth0Client): Promise<AuthState> {
    try {
      await client.logout()

      return {}
    } catch (error) {
      console.log('E', error)

      return { error }
    } finally {
      store.id.set(undefined)
    }
  },
  store,
}

export function verifyEmail(email: string) {
  const match = /^(?<id>.+)@(?<domain>.+)$/.exec(email)
  if (!match || !match.groups) {
    throw new Error(`invalid user email: ${email}`)
  }

  const { id = undefined, domain = undefined } = match.groups
  if (!id || !domain) {
    throw new Error(`invalid user email format: ${email}`)
  } else if (!data.domains.has(domain)) {
    throw new Error(`invalid user email domain: ${domain || email}`)
  }

  return id
}

function createClient() {
  return createAuth0Client(config.auth0)
}

async function authenticate(client: Auth0Client) {
  const token = await client.getIdTokenClaims()
  if (!token || !token.__raw) {
    // throw new Error('invalid token')
    return
  }

  if (!token.email) {
    // throw new Error('malformed token')
    return
  }

  const { email } = token
  const id = verifyEmail(email)

  await api.auth(token.__raw)

  return id
}
