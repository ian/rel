<!-- [![npm](https://img.shields.io/npm/v/rel.js.svg?style=flat-square)](https://www.npmjs.com/package/rel.js)
[![npm](https://img.shields.io/npm/l/rel.js.svg?style=flat-square)](https://www.npmjs.com/package/rel.js)
[![npm](https://img.shields.io/npm/dt/rel.js.svg?style=flat-square)](https://www.npmjs.com/package/rel.js)
![npm bundle size](https://img.shields.io/bundlephobia/min/rel.js)
[![Known Vulnerabilities](https://snyk.io/test/github/rel-js/rel.js/badge.svg)](https://snyk.io/test/github/nftapi/nftapi) -->

# rel.js

[Rel](https://rel.run) is a zero-config backend framework for the frontend of your choice. We've combined [GraphQL](https://graphql.org) with the deep relational capabilities of [redis-graph](https://github.com/RedisGraph/RedisGraph/).

Rel is the end-to-end backend framework:

- [x] Schema driven (`schema.graphql`)
- [x] CRUD + custom endpoints
- [x] Auto-generated client (TypeScript)
- [ ] Authentication and authorization
- [x] Realtime subscriptions
- [ ] Delayed + scheduled jobs
- [x] Event streams / hooks
- [ ] Plugins + Extensions
- [ ] Hosting (later 2022)

## Quickstart

Install Rel to your existing project, or create a new one:

```sh
npx rel-cmd@latest init
```

Afterwards, Then run `rel dev` to start the server on [http://localhost:4000](http://localhost:4000).

Other things available to you after install:

- Visit http://localhost:4000/ for a GraphQL playground.
- Make queries to your GraphQL server at http://localhost:4000/graphql.
- Edit `rel/schema.graphql` (or ./schema.graphql for standalone) to change your schema and generated client.
  <!-- - Integrate Rel with the frontend of your choice: (next.js, svelte, Vue, Expo) -->
  <!-- - Configure server endpoints, streams, and background jobs. -->
  <!-- - Browse the extension marketplace -->

## Community

- [Discord](https://discord.gg/HpuzRGwevb) - Community feedback, announcements, and peer help.
- [GitHub Issues](https://github.com/rel-js/rel/issues) - Report issues + errors while using rel.js.
- [Twitter](https://twitter.com/rel_js) - Help spread the word and give us a follow!

## Roadmap

- [x] Alpha (current): We are activelly developing Rel and not recommending for production yet.
- [ ] Public Alpha (Q2 2022): [Public release](https://github.com/orgs/rel-js/projects/2) for curious developers and hobby projects.
- [ ] Public Beta: Stable enough for most non-enterprise use-cases
- [ ] Public: Production-ready

<!-- ## Useful environment variables

- REL_HOST: The host for the GraphQL endpoint
- REL_PORT: The port for the GraphQL endpoint
- REL_DEBUG: Enable debug messages(example: Cypher queries)
- REL_TRACE: Enable tracing at http://localhost:2929
- REDIS_HOST: The Redis host (with RedisGraph module enabled)
- REDIS_PORT: The Redis port -->

## Development

Rel uses [pnpm](https://pnpm.io/) as our package manager and we love it.

- pnpm install
- pnpm run build
- pnpm run bootstrap:redis

<!-- - Visit http://localhost:4000/schema to view and edit your DB schema. -->

<!-- Install rel.js into your existing project (Next.js, Svelte, Vue, etc.):

- docker run -p 6379:6379 -it --rm redislabs/redisgraph
- npm install rel-run
- make sure you have a valid `schema.graphql` file in your project root -->

<!-- Then on your backend code:

```javascript
import { Server } from "rel.js";

const server = new Server();
```

Go to http://127.0.0.1:4000/altair or consume the endpoint in http://localhost:4000/graphql

## Useful environment variables

- REL_HOST: The host for the GraphQL endpoint
- REL_PORT: The port for the GraphQL endpoint
- REL_DEBUG: Enable debug messages(example: Cypher queries)
- REL_TRACE: Enable tracing at http://localhost:2929
- REDIS_HOST: The Redis host (with RedisGraph module enabled)
- REDIS_PORT: The Redis port

## Development

- pnpm i
- pnpm run build
- pnpm run bootstrap:redis -->
