import { AuthStrategy } from "@reldb/run"

import Social from "./models/social"
import EmailPassword from "./methods/email_password"

export const Models = {
  Social,
}

export const Strategies = {
  EmailPassword,
}

export type AuthOpts = {
  strategies: AuthStrategy[]
}
