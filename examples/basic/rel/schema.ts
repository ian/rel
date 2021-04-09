import Rel from "@reldb/run"

export default {
  Author: Rel.model(
    {
      name: Rel.string().required(),
      born: Rel.int(),
      books: Rel.relation("WROTE", "Book"),
    },
    { endpoints: true }
  ),
  Book: Rel.model(
    {
      title: Rel.string().required(),
      released: Rel.int(),
      author: Rel.relation("WROTE", "Author").inbound(),
    },
    { endpoints: true }
  ),
}
