import Rel from "../meta"
import { Hydrator } from "../server"
import { Input, ModelEndpointOpts } from "../types"

export default function hydrateUpdate(
  label: string,
  endpointOrBoolean: boolean | ModelEndpointOpts,
  input: Input
) {
  if (!endpointOrBoolean) return null
  const endpoint =
    typeof endpointOrBoolean === "boolean" ? {} : endpointOrBoolean

  return (hydrator: Hydrator) => {
    const resolver = async ({ cypher, params }) => {
      const { id, input } = params

      // @todo validation

      // @todo we need to split this logic into a models format
      // ie instead of:
      //   await cypherUpdate(...)
      // it should be:
      //   await models[label].update(...)
      // Models should contain the fields/resolvers -> cypher mapping

      const updated = await cypher.update(label, id, input)

      // if (endpoint.after) {
      //   await endpoint.after(updated)
      // }

      return updated
    }

    hydrator.endpoints(
      Rel.mutation(
        `Update${label}`,
        {
          id: Rel.uuid().required(),
          input: Rel.ref(`${label}Input`).required(),
        },
        Rel.ref(label),
        resolver
      ).guard(endpoint.guard)
    )
  }
}
