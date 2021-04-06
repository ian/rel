import Rel, { AuthModel } from "@reldb/run"

import { authenticate, admin } from "../guards"
import Me from "../endpoints/me"

export default class SocialAuth implements AuthModel {
  reduce(reducer) {
    reducer({
      schema: {
        Auth: Rel.model(
          {
            token: Rel.string().required(),
            user: Rel.type("User").required(),
          },
          { accessors: false, mutators: false, input: false }
        ),
        // Profile: {
        //   ...
        // },
        User: Rel.model({
          following: Rel.relation("FOLLOWS", "User"),
          followers: Rel.relation("FOLLOWS", "User"),
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
