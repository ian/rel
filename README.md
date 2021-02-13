# Internal notes for now

Questions Outstanding

- should we make label and id reserved keywords?

# TODO

## Fields

- [x] generates type object
- [ ] `uuid()`
- [x] `string()`
- [ ] `int()`
- [ ] `boolean()`
- [ ] `date()`
- [ ] `time()`
- [ ] `dateTime()`
- [ ] `url()`
- [x] `phoneNumber()`
- [x] `geo()`
- [ ] `slug({ from: "name" })`
- [ ] `.unique()`
- [ ] `.guard("admin")`
- [ ] `.guard((runtime) => ...)`
- [ ] `timestamps: false`

## Accessors

- [x] find
- [x] list
- [ ] popular?
- [ ] where clauses https://graphcms.com/docs/content-api/queries
- [ ] Guards

## Mutators

- [ ] create
- [ ] merge
- [ ] update
- [ ] delete
- [ ] Guards

## Relationships

- [ ] object field (accessors)
- [ ] mutators
- [ ] out vs in
- [ ] Guards

## Publishing

- [ ] publishedAt?

## Extend

- [ ] GQL extensions

```
server.extend({
  CustomEndpoint: {
    fields: {
      [key:string]: Field
    },
    resolver: (runtime:Runtime) => object })
    guard?: string
  }
})
```

## Auth

- [ ] `server.plugin(require("rel-auth0")({ apiKey: ..., model: "saas" | "accounts" | "users" }))`

## Images

- [ ] `server.plugin(require("rel-imgix")({ apiKey: ... }))`

## Video

- [ ] `server.plugin(require("rel-mux")({ apiKey: ... }))`

## Guards

- [ ] Authenticate
- [ ] Admin

## Jobs

- [ ] server.jobs({ ... })

# Quickstart

Install Rel

`npx rel init`

This will create the following in your project:

```
.
├── db                   # Compiled files (alternatively `dist`)
|   ├── schema.ts        # Typescript definition of your project
|   ├── server.ts        # Standalone server
└── relconfig.json
```

./db/server.ts

```
import Server, { Schema } from "@rel/server"
import schema from "./schema"

const port = process.env.PORT || 4000

Server.start({
  port,
  schema,
})

console.log(`Rel server running on localhost:${port}`)
```

./db/schema.ts

```
export default {
  // ...
}
```

Then head on over to [http://localhost:4000/graphql](http://localhost:4000/graphql) to see your running backend.

# Basic Example

This is using the [Neo4j The Movie Graph](https://github.com/reldb/server/doc/movies.cypher) example from [Neo4j](https://neo4j.com/)

### Import the Dataset

```
rel import https://github.com/reldb/server/doc/movies.cypher --clean
```

### Edit your ./db/schema.ts file

```
import { Schema } from "@rel/server"

export default  {
  Director: {
    fields: {
      name: Schema.string().required(),
    },
    accessors: {
      find: {
        findBy: ["id", "name"],
      },
      list: true,
      create: true,
    },
    relations: {
      movies: {
        from: "Director",
        to: "Movie",
        direction: "OUT" // default
      }
    }
  },
  Movie: {
    fields: {
      title: Schema.string().required(),
      released: Schema.int().required(),
      tagline: Schema.string(),
    },
    relations: {
      director: {
        from: "Movie",
        to: "Director"
        singular: true,
        direction: "IN"
      }
    },
    accessors: {
      find: true,
      list: true,
      create: true,
    },
  },
}
```

### Run the server

`rel dev`

This will create a GraphQL server with the following schema:

```
type Director {
  id: UUID!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Movie {
  id: UUID!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  director: Director
}

type Query {
  GetDirector(id: UUID, name: String): Director
  ListDirectors(limit: Int, skip: Int, order: String): [Director]!

  GetMovie(id: UUID): Movie
  ListMovies(limit: Int, skip: Int, order: String): [Movie]!
}

type Mutation {
  CreateDirector(values: DirectorInput!): Director
  MergeDirector(id: UUID!, values: DirectorInput!): Director
  UpdateDirector(id: UUID!, values: DirectorInput!): Director
  DeleteDirector(id: UUID!): Director

  # since this is a N:1 relationship of Movie:Director, the vernacular is Add/Remove
  AddDirectorMovie(directorId: UUID!, movieId: UUID!): Movie
  RemoveDirectorMovie(directorId: UUID!, movieId: UUID!): Movie

  CreateMovie(values: AuthorInput!): Movie
  MergeMovie(id: UUID!, values: MovieInput!): Movie
  UpdateMovie(id: UUID!, values: MovieInput!): Movie
  DeleteMovie(id: UUID!): Movie

  # since this is a 1:N relationship of Director:Movie, the vernacular is Set/Remove
  SetMovieDirector(directorId: UUID!, movieId: UUID!): Director
  RemoveMovieDirector(directorId: UUID!, movieId: UUID!): Director
}
```
