import chalk from "chalk"

const log = console.log

export default () => {
  log()
  log("We like your eagerness, we really do.")
  log("There's something about that go-getter attitude.")
  log()
  log(
    "Go to " +
      chalk.blueBright("https://rel.run") +
      " and signup for our private alpha."
  )
  log(
    "Or ping " +
      chalk.blueBright("@ianhunter") +
      " on Twitter: " +
      chalk.blueBright("https://twitter.com/ianhunter")
  )
  log()
  log("We'll try and fast track you.")
  log()
}
