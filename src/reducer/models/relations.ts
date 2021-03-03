import camelcase from "camelcase"
import { Reducer } from "~/reducer"
import { type, array, uuid } from "../../fields"
import {
  addRelationResolver,
  listRelationResolver,
  removeRelationResolver,
} from "../../resolvers"
import { Relations, Reducible, ENDPOINTS } from "~/types"

export function reduceRelations(label, relations: Relations): Reducible {
  const reducer = new Reducer()

  Object.entries(relations).forEach((relObj) => {
    const [relName, relation] = relObj
    const { from, to, singular } = relation

    reducer.reduce({
      types: {
        [label]: {
          [relName]: {
            resolver: listRelationResolver(relation),
            typeDef: {
              returns: singular
                ? type(to.label)
                : array(type(to.label)).required(),
            },
          },
        },
      },
      endpoints: {
        [singular ? `${label}Set${to.label}` : `${label}Add${to.label}`]: {
          type: ENDPOINTS.MUTATOR,
          typeDef: {
            params: {
              [`${camelcase(from.label)}Id`]: uuid().required(),
              [`${camelcase(to.label)}Id`]: uuid().required(),
            },
            returns: type(to.label),
          },
          resolver: addRelationResolver(relation),
        },
        [`${label}Remove${to.label}`]: {
          type: ENDPOINTS.MUTATOR,
          typeDef: {
            params: {
              [`${camelcase(from.label)}Id`]: uuid().required(),
              [`${camelcase(to.label)}Id`]: uuid().required(),
            },
            returns: type(to.label),
          },
          resolver: removeRelationResolver(relation),
        },
      },
    })
  })

  return reducer.toReducible()
}
