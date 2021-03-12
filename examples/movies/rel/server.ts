import { server } from "@reldb/core"
import schema from "./schema"

const port = process.env.PORT

server({
  port,
  schema,
})
  .run()
  .then(({ typeDefs, port }) => {
    // console.log(typeDefs)

    console.log(`rel running on http://localhost:${port}`)
  })
