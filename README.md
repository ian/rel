# rel - The backend for frontend developers

There has been quite the renaissance in the Javascript world over the past 10 years. New frontend tooling is pushing the boundaries of both native and web applications.

Our goal is to apply some of the foundations that have made frontend tooling successful to the backend. We want to have you up and running in minutes

# Quickstart

To bootstrap a new project, type:

`npx create-rel-app`

This will run your though a few questions about your project and generate a runnable server.

Then run your project:

`rel run`

# Documentation

Visit [https://rel.run](https://rel.run) to view the full documentation.

# Examples

We have written a number of example projects like Clubhouse, Instagram, Shopify, to show you how easy it is to get setup with rel.

Visit [https://rel.run/examples](https://rel.run/examples)

# What is rel?

rel is a batteries-included, highly configurable and extensible backend-as-a-service for generating GraphQL, REST, and metal APIs. rel is written in [Typescript](https://www.typescriptlang.org/) and [Cypher](http://www.opencypher.org/) on [redis-graph](http://www.opencypher.org/).

rel is designed to handle the 80%+ usecase for most applications. Out of the box it comes with a ton of configurable modules:

- Customizable domain model (e.g. Actors ACT IN Movies, Producers PRODUCE Movies, Movies have People)
- Authentication models (social, saas, crypto, forum, etc.)
- A privileges + guard system with controls at the model, field and endpoint level.
- Background jobs
- Module support for Images (via Imgix), Video (via Mux), Files (via S3, gCloud storage, etc)
- Endpoints generated in your flavor of choise (REST, GraphQL)

The name rel is an homage to the quintessential representation of a relationship in CYPHER. Quite frankly, we wouldn't be here without 'em.

## Why do I need this?

rel was born out of [01](https://01.studio) as a proof-of-concept backend for rapid frontend iteration and product ideation.

Generally, after a design sprint and engineering is ready to build, we find ourselves at the same moment on every project. OK I need a server, let's bolt in X. OK I need Auth, let's bolt in Y. Next generate models and ORM. Then wire up the endpoints to access/mutate data.

rel solves this via offering an extensible domain model and module architecture that provides the ability to customize these same "bolt-in" methodology.

## What is CYPHER?

Quite simply, CYPHER is SQL for Graph Databases. It's a far more elegant and visually representative query language. We're big fans.

Whereas a SQL database seeks to force data into a specific format via field and table constraints, a Graph DB seeks to "make sense" of your data by allowing you to look at it in different ways. We like to think of it as providing the 10,000 ft view all the way down to the

You can read more on Why CYPHER on our documentation: [https://rel.run/docs/why-cypher](https://rel.run/docs/why-cypher)

In general, using rel you will likely never have to write Cypher since the persistence layer is handled for you. However, there are advanced settings that let you drop into a CYPHER query from any endpoint or field.

# Contributing

We are always looking for backend and graph aficionados to help take rel to the next phase.

Please see our contributing.md.

# Authors

- Ian Hunter [@ian](https://github.com/ian) - 01 Studio
