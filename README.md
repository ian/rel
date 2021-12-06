# Instructions

- docker run -p 6379:6379 -it --rm redislabs/redisgraph
- npm install
- npm start

# If you want to see the Svelte frontend in action:

- go to frontend/svelte-typescript/app
- npm install
- npm run build
- restart the GraphQL Server. You should see the frontend running at http://localhost:4000/svelte

Go to http://localhost:4000/playground or consume the endpoint in http://localhost:4000/graphql
