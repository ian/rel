import { Fields, Rel } from "@reldb/core"

export default {
  Author: {
    fields: {
      name: Fields.string().required(),
      born: Fields.int(),
    },
    relations: {
      books: Rel("WROTE").to("Author"),
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
      title: Fields.string().required(),
      released: Fields.int(),
    },
    relations: {
      author: Rel("WROTE").to("Author").direction(Rel.Direction.IN),
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
