import { generate } from '@genql/cli'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default () => {
    generate({
        schema: fs.readFileSync(path.join(__dirname, '/schema/schema.graphql')).toString(),
        output: path.join(__dirname, 'gql-client')
    }).catch(console.error)
}