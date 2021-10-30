# Rel - The backend framework for modern developers.

Rel is the features-driven backend framework. With minimal configuration it's possible to built complex backends in 100% TypeScript.

## Initial Reading

@ian wrote up a bunch of thoughts about what Rel should be in the [MANIFESTO](./MANIFESTO.md)

## Getting Started

To run the absolute bare minimum example:

1. `yarn install && (cd example && yarn install)`
2. `yarn redis`
3. `yarn example`

Use your favorite GraphQL client to send the following queries:

```graphql
{
  listThings {
    name
  }
}
```

or

```graphql
mutation {
  createThing(name: "Test") {
    name
  }
}
```
