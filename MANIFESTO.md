# Product Manifesto

Rel has been a development dream of mine for about 5 years now. It actually started as a proof of concept around combining a GraphQL server and a Graph database (Neo4j at the time)

The mission statement for Rel is to create the easiest to use backend framework. Originally I went with the phrase "The backend framework for frontend developers" because this is the fastest emerging market and it's such a headache for a frontend developer to setup a _robust_ backend.

# Motivation

In general, when starting a new project, developers have two choices for backends:

- Use a BaaS solution where the entire platform is managed for you:
  - Firebase
  - Supabase
  - Hasura
  - Fauna
- Use a custom solution like Next.js serverless functions Node/Express or Nest.js

The high-level tradeoff here is ease and speed for complexity and extensibility.

Rel's goal is to maintain a high level of extensibility while maintaining the best DX for developers.

# Goals of project

- Bring data closer to the frontend
  - React server components represent the direction everything is going.
- Support natural development flow
  - View <--> API live data or stubs
- Provide best best backend experience for application developers
  - Easy to understand database schema
    - schema.graphql + custom directives
  - Robust stdlib
    - String, Integer, Float, ID
    - Geolocation, Geo queries
    - Validation: Email, EthAddress, etc
  - Native solutions to common problems:
    - slugification
    - uniqueness (globally, scoped)
  - Authentication / Authorization
    - Guarded access to endpoints
      - isAuthenticated
      - RBAC
    - next-auth support
- Put domain model in the hands of the developer and have a single source of truth on application domain.

# Project Inspiration

There are lots of projects that have done at least one thing right. We're going to want to learn from these and borrow concepts where we can:

- Astro
  - [https://docs.astro.build/getting-started/#staying-informed](https://docs.astro.build/getting-started/#staying-informed)
  - ?
- GQty
  - Typescript GraphQL client that just works.
  - This is how easy a generated client should be.
- Prisma
  - This is really just a glorified ORM, with lots of complaints
  - There's lots of things that Prisma did right:
    - Single source of truth prisma.schema file.
    - Typescript-safe DB client
    - Prisma studio UI for databases
  - Notes
    - I think it was a mistake for them to take on 3-5 database types, namely SQL and Mongo.
      - "If you're everything, you're nothing"
  - The DX can be quite a headache sometimes:
    - Relationships are really hard to work with
    - Their solution to GraphQL is Nexus, which is still so manual.
    - Requires 2 databases for Planetscale to run (shadow DB + local DB), which is a bit cumbersome
- Nextjs
  - This metaframework on React has taken over the frontend development world:
    - Solid framework that "just works" with zero or minimal configuration
    - Rich ecosystem of plugins
    - Constant releases to standard next library
  - We should learn from next as a successful project, as well as find ways to integrate super deep.
- Planetscale
  - I love how they think about release process for databases.
    - Deploy requests for schemas
    - Github integration
  - Beautiful UI
  - Lots to learn from here.

# Competitors

## Proprietary

- Firebase
  - One of the first and still does the job well.
- Supabase
- Hasura
  - I for the life of me can't figure out why this is popular
- Fauna
  - Same, not sure why this is so popular

## Opensource:

- Supabase
  - The open-source Firebase. Probably the fastest growing company in the space right now.
- Dark lang
  - Now defunct, tried to reinvent the wheel on backend and after multiple rewrites and language changes they ended up running out of money and steam.

## Bring your own:

- Prisma + Nexus + Planetscale
  - This stack seems like its on the fast track to becoming more popular with traditional developers with backend experience.
  - I haven't heard any frontend devs ranting and raving about this, they typically look for a lower lift.
