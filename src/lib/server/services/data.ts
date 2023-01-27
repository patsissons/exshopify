import { data, type ID } from '$lib/server/data'

export async function loadRecord(id: ID) {
  return data.records[id]
}

export async function updateRecord(id: ID, url: string) {
  // TODO: implement
  console.log('D', { id, url })
}
