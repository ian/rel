import Rel, { AuthModel } from "@reldb/run"

import { authenticate, admin } from "../guards"
import Me from "../endpoints/me"

export default class SocialAuth implements AuthModel {
  hydrate(hydrator) {
    hydrator.schema({
      Auth: Rel.output({
        token: Rel.string().required(),
        user: Rel.ref("User").required(),
      }),
      Profile: Rel.output({
        following: Rel.relation("FOLLOWS", "User", {
          endpoints: false,
        }).endpoints(false),
        followers: Rel.relation("FOLLOWS", "User").endpoints(false),
      }),
      User: Rel.output({
        following: Rel.relation("FOLLOWS", "User").endpoints({
          add: "FollowUser",
          remove: "UnfollowUser",
        }),
        followers: Rel.relation("FOLLOWS", "User").endpoints(false),
      }),
    })
    hydrator.guards({
      authenticate,
      admin,
    })
    hydrator.endpoints(Me)
  }
}
