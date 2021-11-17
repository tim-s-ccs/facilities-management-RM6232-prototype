// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session } from 'express-session'
import { Tables } from 'ccs-prototype-kit-model-interface'

declare module 'express-session' {
  interface Session {
    data: {
      tables: Tables
      user: {
        id: number
        email: string
      }
    }
  }
}
