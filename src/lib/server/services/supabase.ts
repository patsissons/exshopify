import {
  createClient as createSupabaseClient,
  type PostgrestResponse,
} from '@supabase/supabase-js'
import moment from 'moment'
import type { Database, UserRow } from '$lib/types'
import { SUPABASE_SERVICE_KEY, SUPABASE_URL } from '$lib/config/env'

export function createClient() {
  if (!SUPABASE_SERVICE_KEY || !SUPABASE_URL) {
    throw new Error('Invalid database access')
  }

  return createSupabaseClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY)
}

export function fromTable() {
  const supabase = createClient()

  return supabase.from('users')
}

export async function queryUser(name: string, ...domains: string[]) {
  const result = await fromTable()
    .select()
    .eq('name', name)
    .in('domain', domains)

  return validateUserResult(result)
}

export async function updateUser(name: string, domain: string, url: string) {
  const { count, error } = await fromTable()
    .select('*', { head: true, count: 'exact' })
    .eq('name', name)
    .eq('domain', domain)

  if (error) {
    throw error
  }

  const update = Boolean(count && count > 0)

  if (update) {
    const updated_at = moment().utc().toISOString()

    const result = await fromTable()
      .update({ url, updated_at })
      .eq('name', name)
      .select()

    return validateUserResult(result)
  }

  const result = await fromTable().insert({ name, domain, url }).select()

  return validateUserResult(result)
}

function validateUserResult(result: PostgrestResponse<UserRow>) {
  if (result.error) {
    throw result.error
  }

  if (result.data.length === 0) {
    throw new Error('user not found')
  }

  if (result.data.length > 1) {
    throw new Error(`invalid user response: ${result.data.length}`)
  }

  return result.data[0]
}
