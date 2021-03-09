import { Command } from "commander"
const program = new Command()
program.version("0.0.1")

program
  .option("-d, --debug", "output extra debugging")
  .option("-s, --small", "small pizza size")
  .option("-p, --pizza-type <type>", "flavour of pizza")

program.parse(process.argv)

const options = program.opts()
if (options.debug) console.log(options)
console.log("pizza details:")
if (options.small) console.log("- small pizza size")
if (options.pizzaType) console.log(`- ${options.pizzaType}`)
