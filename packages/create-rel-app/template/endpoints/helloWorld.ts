import Rel from "@reldb/run"

export default Rel.query("HelloWorld", Rel.string(), () => {
  return "Hello World!"
})
