# cyypher

Cypher ORM + client for redis-graph.

## Inspiration

This project powers the [Rel](https://github.com/rel-js/rel) backend framework. We needed a more robust, relational client for redis-graph.

If you are looking for a more complete schema -> GraphQL server, definitely take a look at our framework.

## Quickstart

### 1. Install npm package

Add the cyypher npm package via your package manager of choice.

```sh
npm install cyypher
```

```sh
yarn add cyypher
```

```sh
pnpm add cyypher
```

### 2. Initialize the client

```
import cyypher from "cyypher"
```

or with custom connection

```
import { Client } from "cyypher"

const cyypher = new Client({
  host: "...",
  port: 1234,
  auth: {
    username: "redis",
    password: "1234
  }
})
```

## Usage

### `find()`

Finds a single node by label and params.

```ts
cyypher.find("Person", { id: "123" })
cyypher.find("Person", { name: "Ian" })
```

### `list()`

List multiple nodes by label and params.

```ts
// List everyone
cyypher.list("Person", { })

// List only admins
cyypher.list("Person", { where: { admin: true } })
```

### `count()`

Count number of matching nodes.

```ts
// total count of a label
cyypher.count("Person")

// where params
cyypher.count("Person", { where: { admin: true } })
```

### `create()`

```ts
cyypher.create("Person", { name: "Inigo Montoya" })

// {
//   name: "Inigo Montoya",
//   _id: "1xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
//   _createdAt: "2022-01-01T00:00:00+00:00",
//   _updatedAt: "2022-01-01T00:00:00+00:00",
// }
```

Ensure uniqueness across a field:

```ts
cyypher.create("Person", { name: "Inigo Montoya" })

// this call is idempotent
cyypher.create("Person", { name: "Inigo Montoya", __unique: "name" })
```

### `findOrCreate()`

A find() and then create() call that will return an existing node if found.

```ts
cyypher.findOrCreate("Person", { name: "Inigo Montoya" })

// {
//   name: "Inigo Montoya",
//   _id: "1xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
//   _createdAt: "2022-01-01T00:00:00+00:00",
//   _updatedAt: "2022-01-01T00:00:00+00:00",
// }

cyypher.findOrCreate("Person", { name: "Inigo Montoya" })

// Same Person
// {
//   name: "Inigo Montoya",
//   _id: "1xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
//   _createdAt: "2022-01-01T00:00:00+00:00",
//   _updatedAt: "2022-01-01T00:00:00+00:00",
// }

cyypher.findOrCreate("Person", { name: "Vizzini" })

// New Person
// {
//   name: "Vizzini",
//   _id: "2xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
//   _createdAt: "2022-01-01T00:00:00+00:00",
//   _updatedAt: "2022-01-01T00:00:00+00:00",
// }
```

Optional: `create` params:

```ts
cyypher.findOrCreate(
  "Person", 
  { id: "1xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" }, 
  { name: "Inigo Montoya" }
)

// {
//   name: "Inigo Montoya",
//   _id: "1xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
//   _createdAt: "2022-01-01T00:00:00+00:00",
//   _updatedAt: "2022-01-01T00:00:00+00:00",
// }
```

> Note: It is not necessary to re-specify find params in the create params, the two will be merged together.

### `merge()`

Similar to `findOrCreate` but uses cypher's native merge command:

```
cyypher.findOrCreate("Person", { name: "Inigo Montoya" })

// {
//   name: "Inigo Montoya",
//   _id: "1xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
//   _createdAt: "2022-01-01T00:00:00+00:00",
//   _updatedAt: "2022-01-01T00:00:00+00:00",
// }
```

### `update()`

### `updateBy()`

### `delete()`

### `deleteBy()`

### `listRelationship()`

### `createRelationship()`

### `clearRelationship()`

### `deleteRelationship()`