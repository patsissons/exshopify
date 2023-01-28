import { log } from '$lib/utils/logging'

export const api = {
  login(token: string) {
    return request('auth/login', { token })
  },
  logout() {
    return request('auth/logout')
  },
  update(url: string) {
    return request('update', { url })
  },
}

type Action = 'auth/login' | 'auth/logout' | 'update'

async function request(action: Action, body?: unknown) {
  const path = `/api/${action}`

  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(text)
    }

    const data = await response.json()
    log('request', { path, body, data })

    return data
  } catch (error) {
    log('request', { path, body, error }, 'E')
    throw error
  }
}
