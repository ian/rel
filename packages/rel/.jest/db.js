const { Connection } = require("../dist/index")

// Fix for async beforeEach
// https://github.com/facebook/jest/issues/1256#issuecomment-230996710
beforeEach(async (done) => {
  const instance = Connection.init({
    type: Connection.NEO4J,
    url: process.env.NEO4J_URI,
    username: process.env.NEO4J_USERNAME,
    password: process.env.NEO4J_PASSWORD,
    // logger: console.log,
  })

  await instance.exec(`MATCH (n) DETACH DELETE n;`)

  done()
})
