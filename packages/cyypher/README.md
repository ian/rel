# cyypher

Cypher ORM + client for redis-graph.

## Inspiration

This project powers the [Rel](https://github.com/rel-js/rel) backend framework. We needed a more robust, relational client for redis-graph.

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

const client = new Client({
  host: "...",
  port: 1234,
  auth: {
    username: "redis",
    password: "1234
  }
})
```

## Usage