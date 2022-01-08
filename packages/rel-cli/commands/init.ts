import fsUtils from 'fs-utils'
import chalk from 'chalk'
import ora from 'ora'

export default async function InitCommand() {
  console.log(`
  ___     _ 
 | _ \\___| |
 |   / -_) |
 |_|_\\___|_| Installer

 Rel is the zero-config backend framework for Javascripters.
`)

  const dir = process.cwd()

  const projectDir = `${dir}/rel`
  const initializing = ora(`Initializing Rel`).start()

  await fsUtils.writeFileSync(
    `${projectDir}/schema.graphql`,
    `"""@model"""
type Post {
  id: ID!
  body: String!
  owner: User!
}

"""@model"""
type User {
  id: ID!
  name: String!
  post: [Post]
}
`
  )

  initializing.succeed(
    'Your Rel schema was created at ' + chalk.greenBright('rel/schema.graphql')
  )

  console.log()
  console.log('Next steps:')
  console.log()
  console.log(
    '1. Run ' +
      chalk.blueBright('rel dev') +
      ' and visit https://localhost:4000'
  )
  console.log(
    '2. Edit ' +
      chalk.greenBright('rel/schema.graphql') +
      ' to update your schema.'
  )
  console.log('3. Read more documentation at https://rel.run/docs')
  console.log()
}
