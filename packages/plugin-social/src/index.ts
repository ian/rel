import { AuthStrategy } from "./types"

import Social from "./social"
import EmailPassword from "./email_password"

export const Models = {
  Social,
}

export const Strategies = {
  EmailPassword,
}

export type AuthOpts = {
  strategies: AuthStrategy[]
}
