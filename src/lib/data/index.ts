import domains from './domains.json'
import { isDevelopment } from '$lib/config/env'

export const data = {
  domains(all = false) {
    return new Map(
      domains.map(({ domain, test }) => [
        domain,
        all || isDevelopment ? true : !test,
      ])
    )
  },
}
