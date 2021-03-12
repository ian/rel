import chalk from "chalk"
import ora from "ora"
import fs from "fs-extra"
import path from "path"

import { Answers } from "./types"

const log = console.log

export default async (answers: Answers) => {
  const { auth, projectName, plugins } = answers
  const dest = process.cwd() + "/" + projectName

  log()
  log("Creating a new rel app in", chalk.green(dest))

  await fs.mkdir(dest, { recursive: true })

  log()
  const relInstaller = ora("Installing rel").start()
  const src = __dirname + "/../files"
  let entries = await fs.readdir(src, { withFileTypes: true })

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name)
    let destPath = path.join(dest, entry.name)
    await fs.copyFile(srcPath, destPath)
  }

  await takeTime(() => {
    relInstaller.succeed()
  }, 5000)

  const relAuthInstaller = ora(`Installing rel auth model [${auth}]`).start()
  await takeTime(() => {
    relAuthInstaller.succeed()
  }, 1000)

  const relPackageInstaller = ora(
    `Installing rel packages [${plugins.join(", ")}]`
  ).start()
  await takeTime(() => {
    relPackageInstaller.succeed()
  }, 3000)

  log()
  log("Initialized git repository.")

  log()
  log(
    chalk.green("Success!"),
    `Created ` + chalk.blueBright(projectName) + ` at ${path}`
  )
  log("Inside that directory, you can run several commands.")
  log()
  // log("  " + chalk.blue("rel config"))
  // log("    Start the interactive configuration")
  log("  " + chalk.blueBright("yarn dev"))
  log("    Start the development server")
  log()
  log("  " + chalk.blueBright("yarn build"))
  log("    Builds the app for production")
  log()
  log("  " + chalk.blueBright("yarn start"))
  log("    Runs the built app in production mode")
  log()
  log("We suggest that you begin by typing:")
  log()
  log("  " + chalk.blueBright("cd") + " " + projectName)
  log("  " + chalk.blueBright("yarn dev"))
  log()
  log()
}

async function takeTime(callback, time) {
  return new Promise((success) => {
    setTimeout(() => {
      callback()
      success(null)
    }, time)
  })
}
