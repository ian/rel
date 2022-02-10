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

### `find(label, where)`

Finds a single node by label and params.

```ts
cyypher.find('Person', { _id: '123' })
cyypher.find('Person', { name: 'Ian' })
```

### `list(label, where)`

List multiple nodes by label and params.

```ts
// List everyone
cyypher.list('Person', {})

// List only admins
cyypher.list('Person', { where: { admin: true } })
```

### `count(label, where)`

Count number of matching nodes.

```ts
// total count of a label
cyypher.count('Person')

// with where params
cyypher.count('Person', { where: { admin: true } })
```

### `create(label, where)`

```ts
cyypher.create('Person', { name: 'Inigo Montoya' })
```

Ensure uniqueness across a field:

```ts
cyypher.create('Person', { name: 'Inigo Montoya' })

// this call is idempotent
cyypher.create('Person', { name: 'Inigo Montoya', __unique: 'name' })
```

### `findOrCreate(label, where, updateParams)`

A find() and then create() call that will return an existing node if found.

```ts
cyypher.findOrCreate('Person', { name: 'Inigo Montoya' })
// this won't create a new node
cyypher.findOrCreate('Person', { name: 'Inigo Montoya' })
// this will create a new node
cyypher.findOrCreate('Person', { name: 'Vizzini' })
```

Optional: `create` params:

```ts
cyypher.findOrCreate(
  'Person',
  { _id: '1xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
  { name: 'Inigo Montoya' }
)
```

> Note: It is not necessary to re-specify find params in the create params, the two will be merged together.

### `merge(label, where, updateParams)`

Similar to `findOrCreate` but uses cypher's native merge command:

```ts
cyypher.merge('Person', { name: 'Inigo Montoya' })
```

### `update(label, id, updateParams)`

Update a node based on ID.

```ts
cyypher.merge('Person', '123', { name: 'Inigo Montoya' })
```

### `updateBy(label, where, updateParams)`

Update multiple nodes by params.

```ts
cyypher.updateBy(
  'Person',
  { name: 'Inigo Montoya' },
  { name: 'Mandy Patinkin' }
)
```

### `delete(label, id)`

Delete a node by ID.

```ts
cyypher.delete('Person', '123')
```

### `deleteBy(label, params)`

Delete multiple nodes by params.

```ts
cyypher.deleteBy('Person', { name: 'Inigo Montoya' })
```

### `listRelationship(from, rel, to, opts)`

List relationships between nodes.

| Param      | Type                           | Required | Description                    | Default |
| :--------- | :----------------------------- | -------- | ------------------------------ | ------- |
| `from`     | `string` \| `object` \| `Node` | yes      | From node                      |
| `rel`      | `string` \| `object` \| `Node` | yes      | Relationship                   |
| `to`       | `string` \| `object` \| `Node` | yes      | To node                        |
| Options    |                                |          |                                |         |
| `singular` | `boolean`                      |          | Singular relationship?         | false   |
| `skip`     | `number`                       |          | Skip offset                    | 0       |
| `limit`    | `number`                       |          | Number of results              |
| `order`    | `object`                       |          | Order the results              |
| `orderRaw` | `string`                       |          | Direct order string to pass in |

```ts
// List N-1 between many nodes
cyypher.listRelationship('Person', 'FRIEND', { _id: '456' })

// List all FRIEND relationships between Persons
cyypher.listRelationship('Person', 'FRIEND', 'Person')

// List 1-1 between two nodes
cyypher.listRelationship({ _id: '123' }, 'FRIEND', { _id: '456' })

// You can also pass a node instance
import { ref } from 'cyypher'
const fromNode = await cyypher.find('Person', 'ID')
const toNode = await cyypher.find('Person', 'ID2')

cyypher.listRelationship(ref(fromNode), 'FRIEND', ref(toNode))

// List 1-1 between two nodes with types
cyypher.listRelationship({ __typename: 'Person', _id: '123' }, 'FRIEND', {
  __typename: 'Person',
  _id: '456',
})

// List 1-1 between two nodes with relation params
cyypher.listRelationship(
  { _id: '123' },
  { __typename: 'FRIEND', relation: 'close', metAt: new Date() },
  { _id: '456' }
)

// List directed relationship (IN, OUT, NONE)
cyypher.listRelationship(
  { _id: '123' },
  { __typename: 'FRIEND', __direction: 'OUT' },
  { _id: '456' }
)
```

### `createRelationship(from, rel, to, opts)`

Create relationship(s) between two or more nodes.

| Param      | Type                           | Required | Description            | Default |
| :--------- | :----------------------------- | -------- | ---------------------- | ------- |
| `from`     | `string` \| `object` \| `Node` | yes      | From node              |
| `rel`      | `string` \| `object` \| `Node` | yes      | Relationship           |
| `to`       | `string` \| `object` \| `Node` | yes      | To node                |
| Options    |                                |          |                        |         |
| `singular` | `boolean`                      |          | Singular relationship? | false   |

```ts
// Using params
cyypher.createRelationship({ _id: '123' }, 'FRIEND', { _id: '456' })

// Using node references
import { ref } from 'cyypher'
const fromNode = await cyypher.find('Person', 'ID')
const toNode = await cyypher.find('Person', 'ID2')
cyypher.createRelationship(ref(fromNode), 'FRIEND', ref(toNode))

// Singular
cyypher.createRelationship(
  { _id: '123' },
  'FRIEND',
  { _id: '456' },
  { singular: true }
)
```

### `clearRelationship()`

Clear all relationships between two or more nodes.

| Param  | Type                           | Required | Description  | Default |
| :----- | :----------------------------- | -------- | ------------ | ------- |
| `from` | `string` \| `object` \| `Node` | yes      | From node    |
| `rel`  | `string` \| `object` \| `Node` | yes      | Relationship |

```ts
// Using params
cyypher.clearRelationship({ _id: '123' }, 'FRIEND')
```

### `deleteRelationship()`

Delete relationship(s) between two or more nodes.

| Param  | Type                           | Required | Description  | Default |
| :----- | :----------------------------- | -------- | ------------ | ------- |
| `from` | `string` \| `object` \| `Node` | yes      | From node    |
| `rel`  | `string` \| `object` \| `Node` | yes      | Relationship |
| `to`   | `string` \| `object` \| `Node` | yes      | To node      |

```ts
// Using params
cyypher.deleteRelationship({ _id: '123' }, 'FRIEND', { _id: '456' })

// Using node references
import { ref } from 'cyypher'
const fromNode = await cyypher.find('Person', 'ID')
const toNode = await cyypher.find('Person', 'ID2')
cyypher.deleteRelationship(ref(fromNode), 'FRIEND', ref(toNode))
```
