import fs from "fs"
import path from "path"
import Rel from "rel-server"
import { printSchema } from "graphql"
import { generateClient } from "rel-client"

type Opts = {
  dir: string
  logging: boolean
}

export default async (opts: Opts): Promise<void> => {
  const currentDir = process.cwd()
  const config = fs.readFileSync(`${currentDir}/rel.config.json`).toString()
  const { baseDir } = JSON.parse(config)

  const typeDefs = fs
    .readFileSync(path.join(baseDir, "schema.graphql"))
    .toString()

  const server = new Rel({
    typeDefs,
  })
  const generatedSchema = await server.generateSchema()

  await generateClient({
    schema: printSchema(generatedSchema),
    outputPath: path.join(baseDir, "client"),
  })
}
