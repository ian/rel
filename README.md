# Rel Run

## Instructions

- docker run -p 6379:6379 -it --rm redislabs/redisgraph
- npm install rel-run
- make sure you have a valid `schema.graphql` file in your project root

Then on your backend code:

```javascript
import relRun from 'rel-server'

const app = relRun() // app is a Fastify server instance!
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
- pnpm run bootstrap:redis
