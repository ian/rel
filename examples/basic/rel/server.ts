import { server } from "@reldb/run"
import schema from "./schema"

export default server({
  port: process.env.PORT,
}).schema(schema)
