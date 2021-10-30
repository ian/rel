const { Connection } = require("../dist/index")

// Fix for async beforeEach
// https://github.com/facebook/jest/issues/1256#issuecomment-230996710
beforeEach(async (done) => {
  const instance = Connection.init({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  })

  await instance.exec(`MATCH (n) DETACH DELETE n;`)

  done()
})
