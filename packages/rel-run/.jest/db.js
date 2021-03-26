const Cypher = require("../src/cypher")

// Fix for async beforeEach
// https://github.com/facebook/jest/issues/1256#issuecomment-230996710
beforeEach(async (done) => {
  await Cypher.cypher(`MATCH (n) DETACH DELETE n;`)
  done()
})