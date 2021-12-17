# Instructions

- docker run -p 6379:6379 -it --rm redislabs/redisgraph
- npm install
- npm start

# If you want to see the Svelte frontend in action:

- go to frontend/svelte-typescript/app
- npm install
- npm run build
- restart the GraphQL Server. You should see the frontend running at http://localhost:4000/svelte/

Go to http://127.0.0.1:4000/altair or consume the endpoint in http://localhost:4000/graphql

# Useful environment variables

- REL_HOST: The host for the GraphQL endpoint
- REL_PORT: The port for the GraphQL endpoint
- REL_DEBUG: Enable debug messages(example: Cypher queries)
- REL_TRACE: Enable tracing at http://localhost:2929
- REDIS_HOST: The Redis host (with RedisGraph module enabled)
- REDIS_PORT: The Redis port
