import Rel from "@reldb/run"

export default Rel.model("Person", {
  firstName: Rel.string().required(),
  lastName: Rel.string().required(),
  name: Rel.string().resolve(({ obj }) =>
    [obj.firstName, obj.lastName].join(" ")
  ),
}).endpoints(true)
