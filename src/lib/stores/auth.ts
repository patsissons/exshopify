import { writable } from 'svelte/store'

export const auth = {
  id: writable<string | undefined>(),
}
