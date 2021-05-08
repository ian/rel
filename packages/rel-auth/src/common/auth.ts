import Rel, { Types } from "@reldb/run"

import MeEndpoint from "../endpoints/me"

export default (hydrator: Types.Hydrator) => {
  hydrator.outputs(
    Rel.output("Profile", {
      id: Rel.uuid().required(),
    }),
    Rel.output("User", {
      id: Rel.uuid().required(),
    }),
    Rel.output("Auth", {
      token: Rel.string().required(),
      user: Rel.ref("User").required(),
    })
  )

  hydrator.endpoints(MeEndpoint)
}
