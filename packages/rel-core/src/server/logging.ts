import { ApolloServerPlugin } from "apollo-server-plugin-base"
import Events from "../util/events"
import { formatSdl } from "format-graphql"

export const logger: ApolloServerPlugin = {
  requestDidStart() {
    const startTime = process.hrtime()
    return {
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
