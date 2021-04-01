const { cypher, init } = require("../src")

beforeAll(() => {
  init({
    url: process.env.NEO4J_URI,
    username: process.env.NEO4J_USERNAME,
    password: process.env.NEO4J_PASSWORD
  })
})

// Fix for async beforeEach
// https://github.com/facebook/jest/issues/1256#issuecomment-230996710
beforeEach(async (done) => {
  await cypher(`MATCH (n) DETACH DELETE n;`)
  done()
})