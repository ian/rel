import { fields, Direction } from "@reldb/core"
const { array, int, string } = fields

export default {
  Author: {
    fields: {
      name: string().required(),
      born: int(),
    },
    relations: {
      books: {
        from: {
          label: "Author",
        },
        to: {
          label: "Book",
        },
        rel: {
          label: "WROTE",
        },
      },
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
      author: {
        from: {
          label: "Book",
        },
        to: {
          label: "Author",
        },
        rel: {
          label: "WROTE",
          direction: Direction.IN,
        },
        singular: true,
      },
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
