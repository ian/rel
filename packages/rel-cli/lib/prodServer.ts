#!/usr/bin/env node

;(async function () {
  const dir = process.cwd()
  const server = require(`${dir}/dist/server.js`).default

  await server.start().then(({ typeDefs, port }) => {
    console.log(`rel running on http://localhost:${port}`)
  })
})()
