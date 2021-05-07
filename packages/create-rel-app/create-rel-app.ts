#!/usr/bin/env node

import fs from "fs-extra"
import slugify from "slugify"
import fsUtils from "fs-utils"
import chalk from "chalk"
import ora from "ora"
import spawn from "cross-spawn"
import inquirer from "inquirer"
import crypto from "crypto"
import alpha from "./alpha"
;(async () => {
  const pkg = require(__dirname + "/../package.json")

  const passcode = crypto
    .createHash("sha256")
    .update(process.argv[process.argv.length - 1])
    .digest("hex")

  if (
    passcode !==
    "1f5bb3d1b432df557d89b1c29403b55702e6300eb984f5ab80928490b860bc56"
  ) {
    alpha()
    process.exit()
  }

  console.log()
  console.log(`Rel installer v${pkg.version}`)
  console.log()

  inquirer
    .prompt([
      {
        type: "input",
        name: "projectName",
        message: "What's the name of your project?",
      },
    ])
    .then(async (answers) => {
      const dir = process.cwd()
      const projectName = slugify(answers.projectName, {
        remove: /[!@#$%^&*()_+|}{:"?><\[\];',./}]/g,
      })

      const projectDir = `${dir}/${projectName}`

      const initializing = ora(`Initializing Project ${projectName}`).start()

      await fsUtils.writeFileSync(
        `${projectDir}/package.json`,
        `
{
  "name": "${projectName}",
  "version": "0.0.0",
  "description": "",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "rel build",
    "start": "rel start",
    "dev": "rel dev",
    "redis": "docker run -p 6379:6379 redislabs/redismod"
  },
  "devDependencies": {
    "env-cmd": "^10.0.1",
    "jest": "^26.4.2",
    "ts-jest": "^26.3.0",
    "ts-node": "^9.0.0",
    "typescript": "^4.0.2"
  },
  "dependencies": {}
}`
      )

      const filesToCopy = [
        ".gitignore",
        ".env",
        "tsconfig.json",
        "server.ts",
        "models/person.ts",
        "endpoints/helloWorld.ts",
      ]
      for (const file of filesToCopy) {
        await fs
          .copy(`${__dirname}/template/${file}`, `${projectDir}/${file}`)
          .catch(console.log)
      }

      initializing.succeed("Initialized")

      console.log()
      console.log("Installing Dependencies")
      console.log()

      process.chdir(`./${projectName}`)

      await spawnAsync(`yarn`, ["install"], {
        stdio: "inherit",
      }).catch((err) => {
        console.error(err)
      })

      await spawnAsync(`yarn`, ["add", "@reldb/cli", "@reldb/run"], {
        stdio: "inherit",
      }).catch((err) => {
        console.error(err)
      })

      console.log()
      console.log(`Rel installed into ./${projectName}`)
      console.log()
      console.log("Inside that directory, you can run several commands.")
      console.log()
      console.log("  " + chalk.blueBright("yarn build"))
      console.log("    Builds the app for production")
      console.log()
      console.log("  " + chalk.blueBright("yarn start"))
      console.log("    Builds the app for production")
      console.log()
      console.log("  " + chalk.blueBright("yarn dev"))
      console.log("    Start the development server")
      console.log()
      console.log("  " + chalk.blueBright("yarn redis"))
      console.log("    Runs Dockerized Redis DB")
      console.log()
      console.log("We suggest that you begin by typing:")
      console.log()
      console.log("  " + chalk.yellowBright("cd" + " " + projectName))
      console.log("  " + chalk.yellowBright("yarn dev"))
      console.log()
      console.log()
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    })
})()

async function spawnAsync(program, args, options) {
  options = (Array.isArray(args) ? options : args) || {}
  args = Array.isArray(args) ? args : []
  const code = await new Promise((resolve, reject) => {
    const cp = spawn(program, args, options)
    cp.on("error", (ex) => reject(ex))
    cp.on("close", (code) => resolve(code))
  })
  if (code !== 0) {
    throw new Error(
      `${program}${
        args.length ? ` ${JSON.stringify(args)}` : ""
      } exited with non-zero code ${code}.`
    )
  }
}
