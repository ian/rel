import fs from "fs"
import fsUtils from "fs-utils"
import slugify from "slugify"
import { execSync } from "child_process"
import chalk from "chalk"
import ora from "ora"
import inquirer from "inquirer"

const { version } = require("../../package.json")

export default async function InitCommand() {
  console.log(`
  ___     _ 
 | _ \\___| |
 |   / -_) |
 |_|_\\___|_| Installer

 Rel is the zero-config backend framework for Javascripters.
`)

  const dir = process.cwd()

  // default installation path
  // let projectDir = `${dir}/rel`

  const isNPM = fs.existsSync("./package-lock.json")
  const isYarn = fs.existsSync("./yarn.lock")
  const isPNPM = fs.existsSync("./pnpm-lock-yaml")
  const isExistingProject = isNPM || isYarn || isPNPM

  let cmd = "npm"
  let projectDir = "."

  if (isExistingProject) {
    console.log("Exising project found in .")

    switch (true) {
      case isNPM:
        cmd = "npm"
        break
      case isYarn:
        cmd = "yarn"
        break
      case isPNPM:
        cmd = "pnpm"
        break
    }
  } else {
    const { projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "What's the name of your project?",
        default: "api",
      },
    ])

    const projectSlug = slugify(projectName, {
      remove: /[!@#$%^&*()_+|}{:"?><\[\];',./}]/g,
    })
    projectDir = `${dir}/${projectSlug}`
    fs.mkdirSync(projectDir)
    process.chdir(projectDir)

    await fsUtils.writeFileSync(
      `./package.json`,
      `
{
"name": "${projectName}",
"version": "0.0.1",
"description": "",
"main": "index.js",
"license": "MIT",
"scripts": {
  "dev": "rel dev",
  "redis": "docker run -p 6379:6379 redislabs/redismod"
},
"devDependencies": {},
"dependencies": {}
}`
    )
  }

  const initializing = ora(`Installing Rel packages`).start()
  execSync(`${cmd} add rel-cmd@${version}`)
  initializing.succeed(`Rel packages installed`)

  const { path } = await inquirer.prompt([
    {
      type: "input",
      name: "path",
      message: "Base directory for Rel project?",
      default: isExistingProject ? "./rel" : ".",
    },
  ])

  await fsUtils.writeFileSync(
    `${path}/rel.config.js`,
    `
const relConfig = {
  baseDir: "${path}"
}
    
module.exports = relConfig
`
  )

  await fsUtils.writeFileSync(
    `${path}/schema.graphql`,
    `
type Movie {
  title: String!
  year: Int
  rating: Float
  genres: [Genre]! @rel(label: "IN_GENRE", direction: OUT)
}

type Genre {
  name: String
  movies: [Movie]! @rel(label: "IN_GENRE", direction: IN)
}
    
`
  )

  console.log()
  console.log()
  console.log(
    `Success! Created reljs at directory`,
    chalk.greenBright(projectDir)
  )
  console.log(`Next steps:`)
  console.log()
  console.log(
    "1. Run " +
      chalk.blueBright("rel dev") +
      " and visit https://localhost:4000"
  )
  console.log(
    "2. Edit " +
      chalk.greenBright(`${path}/schema.graphql`) +
      " to update your schema."
  )
  console.log("3. Read more documentation at https://rel.run/docs")
  console.log()
}

type Question = {
  type: string
  name: string
  message: string
  default?: string
}
