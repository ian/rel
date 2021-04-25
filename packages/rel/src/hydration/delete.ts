import Rel from "../index"
import { Hydrator } from "../server"
import { ModelEndpointOpts } from "../types"

export default function hydrateDelete(
  label: string,
  endpointOrBoolean: boolean | ModelEndpointOpts
) {
  if (!endpointOrBoolean) return null

  let endpoint = typeof endpointOrBoolean === "boolean" ? {} : endpointOrBoolean

  return (hydrator: Hydrator) => {
    hydrator.endpoints(
      Rel.mutation(
        `Delete${label}`,
        { id: Rel.uuid().required() },
        Rel.ref(label),
        async ({ cypher, params }) => {
          const { id } = params

          const updated = await cypher.delete(label, id)
          return updated
        }
      ).guard(endpoint.guard)
    )
  }
}
