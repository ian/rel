import { string, int, rel } from "@reldb/core"

export default {
  Author: {
    fields: {
      name: string().required(),
      born: int(),
    },
    relations: {
      books: rel("WROTE").to("Author"),
    },
    accessors: {
      find: true,
      list: true,
    },
    mutators: {
      create: true,
      update: true,
      delete: true,
    },
  },
  Book: {
    fields: {
      title: string().required(),
      released: int(),
    },
    relations: {
      author: rel("WROTE").to("Author").direction(Rel.Direction.IN),
    },
    accessors: {
      find: true,
      list: true,
    },
    mutators: {
      create: true,
      update: true,
      delete: true,
    },
  },
}
