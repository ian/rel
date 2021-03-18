import camelcase from "camelcase"
import { Reducer } from "."
import { Fields } from "../property"
import {
  addRelationResolver,
  listRelationResolver,
  removeRelationResolver,
} from "../resolvers"
import { Relations, Reducible, ENDPOINTS } from "../types"

export function reduceRelations(label, relations: Relations): Reducible {
  const reducer = new Reducer()

  Object.entries(relations).forEach((relObj) => {
    const [relName, relation] = relObj
    const resolved = {
      from: { label },
      ...relation.toResolved(),
    }

    const { from, to, singular, guard } = resolved

    reducer.reduce({
      outputs: {
        [label]: {
          [relName]: {
            resolver: listRelationResolver(resolved),
            returns: resolved.singular
              ? Fields.type(to.label).guard(guard)
              : Fields.array(Fields.type(to.label)).required().guard(guard),
          },
        },
      },
      endpoints: {
        [singular ? `${label}Set${to.label}` : `${label}Add${to.label}`]: {
          target: ENDPOINTS.MUTATOR,
          params: {
            [`${camelcase(from.label)}Id`]: Fields.uuid().required(),
            [`${camelcase(to.label)}Id`]: Fields.uuid().required(),
          },
          returns: Fields.type(to.label),
          resolver: addRelationResolver(resolved),
        },
        [`${label}Remove${to.label}`]: {
          target: ENDPOINTS.MUTATOR,
          params: {
            [`${camelcase(from.label)}Id`]: Fields.uuid().required(),
            [`${camelcase(to.label)}Id`]: Fields.uuid().required(),
          },
          returns: Fields.type(to.label),
          resolver: removeRelationResolver(resolved),
        },
      },
    })
  })

  return reducer.toReducible()
}
