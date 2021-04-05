import { string, int, relation } from "@reldb/meta"

export default {
  Author: {
    fields: {
      name: string().required(),
      born: int(),
    },
    relations: {
      books: relation("WROTE").to("Author"),
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
      author: relation("WROTE", "Author").inbound(),
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
