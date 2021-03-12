import { fields, Direction } from "@reldb/core"
const { array, int, string } = fields

export default {
  Movie: {
    fields: {
      title: string().required(),
      released: int(),
      // phoneNumber: phoneNumber().required()
      // slug: slug({ from: 'title' }).required()
      // following: rel("FOLLOWS").to(type("User21")),
    },
    accessors: {
      find: true,
      list: true,
    },
  },
  Person: {
    fields: {
      name: string().required(),
      born: int(),
    },
    accessors: {
      find: true,
      list: true,
    },
    relations: {
      following: {
        from: {
          label: "Person",
        },
        to: {
          label: "Person",
        },
        rel: {
          label: "FOLLOWS",
          direction: Direction.OUT,
        },
      },
      followers: {
        from: {
          label: "Person",
        },
        to: {
          label: "Person",
        },
        rel: {
          label: "FOLLOWS",
          direction: Direction.IN,
        },
      },
      moviesActedIn: {
        from: {
          label: "Person",
        },
        to: {
          label: "Movie",
        },
        rel: {
          label: "ACTED_IN",
          direction: Direction.OUT,
        },
      },
      moviesDirected: {
        from: {
          label: "Person",
        },
        to: {
          label: "Movie",
        },
        rel: {
          label: "DIRECTED",
          direction: Direction.OUT,
          params: {
            roles: array(string()),
          },
        },
      },
    },
  },
}
