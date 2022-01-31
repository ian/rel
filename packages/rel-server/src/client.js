import { generate } from '@genql/cli'
import fs from 'fs'

export default ({ dir, logger }) => {
  generate({
    schema: fs.readFileSync(dir + '/gen/schema.graphql').toString(),
    output: dir + '/gen/gql-client',
  })
    .then(() => {
      logger?.info(`GraphQL Client generated at ${dir + '/gen/gql-client'}`, 'INIT')
    })
    // .catch(console.error)
}
