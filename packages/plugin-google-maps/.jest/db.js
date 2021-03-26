const { cypher } = require("@reldb/run")

// Fix for async beforeEach
// https://github.com/facebook/jest/issues/1256#issuecomment-230996710
beforeEach(async (done) => {
  await cypher.exec(`MATCH (n) DETACH DELETE n;`)
  done()
})