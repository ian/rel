import { GraphQLInt, GraphQLFloat, GraphQLString } from 'graphql'
import { TimeResolver, JSONResolver, JSONObjectResolver } from 'graphql-scalars'
import { isSpecifiedGraphbackScalarType, Time, DateTime, Timestamp, Date_, JSON_, JSONObject, isSpecifiedGraphbackJSONScalarType } from '../src'

describe('Graphback scalars', () => {
  test('should return false for none GraphbackScalars', () => {
    const scalars = [TimeResolver, JSONResolver, JSONObjectResolver, GraphQLInt, GraphQLFloat, GraphQLString]

    for (const scalar of scalars) {
      const isGraphbackScalar = isSpecifiedGraphbackScalarType(scalar)
      expect(isGraphbackScalar).toBeFalsy()
    }
  })

  test('should return true for all Graphback scalars', () => {
    const graphbackScalars = [Time, DateTime, Timestamp, Date_, JSON_, JSONObject]

    for (const graphbackScalar of graphbackScalars) {
      const isGraphbackScalar = isSpecifiedGraphbackScalarType(graphbackScalar)
      expect(isGraphbackScalar).toBeTruthy()
    }
  })

  test('should return true for all Graphback JSON scalars', () => {
    const graphbackJSONScalars = [JSON_, JSONObject]

    for (const graphbackJSONScalar of graphbackJSONScalars) {
      const isGraphbackJSONScalar = isSpecifiedGraphbackJSONScalarType(graphbackJSONScalar)
      expect(isGraphbackJSONScalar).toBeTruthy()
    }
  })

  test('should return true for all non Graphback JSON scalars', () => {
    const scalars = [Time, DateTime, Timestamp, Date_, GraphQLFloat, GraphQLString, JSONObjectResolver, JSONResolver]

    for (const scalar of scalars) {
      const isGraphbackJSONScalar = isSpecifiedGraphbackJSONScalarType(scalar)
      expect(isGraphbackJSONScalar).toBeFalsy()
    }
  })
})
