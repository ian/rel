// Jest is a nightmare with Typescript. Need to figure something else out.

import { Client } from '../index'

async function run() {
  const client = new Client('redis://localhost:6379')
  const count = await client.count('Person')
  console.log({ count })
}

run()
