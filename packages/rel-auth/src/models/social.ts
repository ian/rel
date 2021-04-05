import { AuthModel } from "@reldb/types"
import { string, type, relation, model } from "@reldb/meta"

import { authenticate, admin } from "../guards"
import Me from "../endpoints/me"

export default class SocialAuth implements AuthModel {
  reduce(reducer) {
    reducer({
      schema: {
        Auth: model({ input: false })
          .fields({
            token: string().required(),
            user: type("User").required(),
          })
          .guard("admin")
          .accessors(false)
          .mutators(false),
        User: model().relations({
          following: relation("FOLLOWS", "User"),
          followers: relation("FOLLOWS", "User"),
        }),
      },
      guards: {
        authenticate,
        admin,
      },
      endpoints: {
        ...Me,
        // Leaderboard?
      },
    })
  }
}
