export const api = {
  auth(token: string) {
    return request('auth', { token })
  },
  update(url: string) {
    return request('update', { url })
  },
}

type Action = 'auth' | 'update'

async function request(action: Action, body: unknown) {
  const path = `/api/${action}`

  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    console.log('D', { path, body, data })

    return data
  } catch (error) {
    console.log('E', { path, body, error })
  }
}
