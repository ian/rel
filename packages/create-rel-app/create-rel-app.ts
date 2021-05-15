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

function hash(str) {
  return crypto.createHash("sha256").update(str).digest("hex")
}

;(async () => {
  // const pkg = require(__dirname + "/../package.json")
  const passcode = hash(process.argv[process.argv.length - 1])

  if (
    passcode !==
    "46148637a86de480c59e060b02114c029c04dfd17e89cd615adc83ee2faa83a2"
  ) {
    alpha()
    process.exit()
  }

  console.log(`

  ___     _ 
 | _ \\___| |
 |   / -_) |
 |_|_\\___|_| Installer

 Rel is the ultimate backend framework for Javascripters.
`)

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

      console.log("")
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

      await fsUtils.writeFileSync(
        `${projectDir}/.gitignore`,
        `node_modules
dist
.env*`
      )

      const filesToCopy = [
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

      initializing.succeed(`Initialized Directory ./${projectName}`)

      const dependencies = ora(`Installing Dependencies`).start()

      process.chdir(`./${projectName}`)

      await spawnAsync(`yarn`, ["install"], {
        // stdio: "inherit",
      }).catch((err) => {
        console.error(err)
      })

      await spawnAsync(`yarn`, ["add", "@reldb/cli", "@reldb/run"], {
        // stdio: "inherit",
      }).catch((err) => {
        console.error(err)
      })

      dependencies.succeed("Dependencies Installed")

      console.log()
      console.log(`Rel installed into ./${projectName}`)
      console.log()
      console.log("Inside that directory, you can run several commands.")
      console.log()
      console.log("  " + chalk.blueBright("yarn build"))
      console.log("    Builds the app for production")
      console.log()
      console.log("  " + chalk.blueBright("yarn start"))
      console.log("    Runs the production app")
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
