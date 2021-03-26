import { server } from "@reldb/run"
import schema from "./schema"

const port = process.env.PORT

export default server({
  port,
  schema,
})
