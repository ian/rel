import Rel, { Types } from "@reldb/run"

import { authenticate, admin } from "./guards"
import MeEndpoint from "./endpoints/me"

export default (hydrator: Types.Hydrator) => {
  hydrator.schema(
    Rel.model(
      "Profile",
      {
        following: Rel.relation("FOLLOWS").to("User").endpoints(false),
        followers: Rel.relation("FOLLOWS").to("User").endpoints(false),
      },
      { input: false }
    ),
    Rel.model(
      "User",
      {
        following: Rel.relation("FOLLOWS").to("User").endpoints(false),
        followers: Rel.relation("FOLLOWS").to("User").endpoints(false),
      },
      { input: false }
    )
  )

  hydrator.inputs(
    Rel.input("AuthInput", {
      token: Rel.string().required(),
      user: Rel.ref("UserInput").required(),
    })
  )

  hydrator.outputs(
    Rel.output("Auth", {
      token: Rel.string().required(),
      user: Rel.ref("User").required(),
    })
  )

  hydrator.guards(authenticate, admin)
  hydrator.endpoints(MeEndpoint)
}
