import { server } from "@reldb/core"
import schema from "./schema"

const port = process.env.PORT

export default server({
  port,
  schema,
})
