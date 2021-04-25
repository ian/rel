import Rel from "../meta"
import {
  ModelEndpointOpts,
  Input,
  Hydrator,
  Runtime,
  InputProperties,
} from "../types"

export default function hydrateCreate(
  label: string,
  endpointOrBoolean: boolean | ModelEndpointOpts,
  input: Input
) {
  if (!endpointOrBoolean) return null

  let endpoint = typeof endpointOrBoolean === "boolean" ? {} : endpointOrBoolean

  return (hydrator: Hydrator) => {
    hydrator.endpoints(
      Rel.mutation(
        `Create${label}`,
        {
          input: Rel.ref(`${label}Input`).required(),
        },
        Rel.ref(label),
        async (runtime) => {
          const { params, cypher } = runtime

          // @todo validation

          const defaults = await objectDefaults(
            runtime,
            label,
            params.input,
            input.props
          )

          const values = {
            ...defaults,
            ...params.input,
          }

          const created = await cypher.create(label, values)

          // if (endpoint.after) {
          //   await endpoint.after(created)
          // }

          return created
        }
      ).guard(endpoint.guard)
    )
  }
}

export async function objectDefaults(
  runtime: Runtime,
  label: string,
  obj: object,
  props: InputProperties
) {
  const _defaults = {}
  for (const entry of Object.entries(props)) {
    const [fieldName, prop] = entry
    const val = await prop.defaulted(
      { ...runtime, obj },
      {
        modelName: label,
        fieldName,
      }
    )
    if (typeof val !== "undefined") _defaults[fieldName] = val
  }

  return _defaults
}
