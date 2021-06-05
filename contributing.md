# Contributing to rel

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Create a new branch `git checkout -b MY_BRANCH_NAME`
3. Install yarn: `npm install -g yarn`
4. Install the dependencies: `yarn`
5. Run `yarn dev` to build and watch for code changes
6. `git push` your repo up to github.
7. open a pull request to the this repository.
8. _thanks for your contribution!_

## Getting setup

You will need a redis DB running

- `brew install redis` on Mac OS X

Next, edit your `.env` and set your redis database parameters:

```
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_USERNAME=
REDIS_PASSWORD=
```

That's it for configuration.

## To run tests

Running all tests:

```sh
yarn test
```
