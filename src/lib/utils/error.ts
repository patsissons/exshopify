import type { HttpError, Redirect } from '@sveltejs/kit'

export function errorReason(error: unknown) {
  if (!error) return 'unknown error'
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  if (typeof error === 'object') return error.toString()

  return JSON.stringify(error)
}

export function isHttpError(value: unknown): value is HttpError {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'status' in value &&
      typeof value.status === 'number' &&
      'body' in value &&
      value.body &&
      typeof value.body === 'object' &&
      'message' in value.body &&
      typeof value.body.message === 'string'
  )
}

export function isRedirect(value: unknown): value is Redirect {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'status' in value &&
      typeof value.status === 'number' &&
      [300, 301, 302, 303, 304, 305, 306, 307, 308].includes(value.status) &&
      'location' in value &&
      typeof value.location === 'string'
  )
}
