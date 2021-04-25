import { ApolloServerPlugin } from "apollo-server-plugin-base"
import Events from "./events"
import { formatSdl } from "format-graphql"

export const logger: ApolloServerPlugin = {
  requestDidStart() {
    const startTime = process.hrtime()
    return {
      didEncounterErrors(requestContext) {
        Events.graphqlError({
          queryHash: requestContext.queryHash,
          query: requestContext.request.query,
          errors: requestContext.errors,
        })
      },
      willSendResponse(requestContext) {
        const { query, variables, operationName } = requestContext.request
        const time = process.hrtime(startTime)

        Events.graphql(
          {
            operationName,
            query: formatSdl(query, {
              sortDefinitions: false,
              sortFields: false,
            }),
            variables,
          },
          time
        )
      },
    }
  },
}
