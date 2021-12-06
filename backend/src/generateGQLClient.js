import { generate } from '@genql/cli'
import fs from 'fs'
import { packageDirectorySync } from 'pkg-dir'

const dir = packageDirectorySync()

export default () => {
  generate({ 
    schema: fs
      .readFileSync(dir + '/schema/schema.graphql')
      .toString(),
    output: dir + '/gql-client',
  }).catch(console.error) 
}
