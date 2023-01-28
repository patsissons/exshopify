import type { Database } from './supabase'

export type { Database }

export type Schema = Database['public']
export type Tables = Schema['Tables']
export type Users = Tables['users']
export type UserRow = Users['Row']
