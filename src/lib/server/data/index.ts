import records from './records.json'

export type ID = string

export interface Redirect {
  url: string
  editKey?: string
}

export interface Data {
  records: Record<ID, Redirect | undefined>
}

export const data = {
  records,
} as Data
