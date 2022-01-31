#!/usr/bin/env node

import { Command } from 'commander'

import DevCommand from '../commands/dev'
import InitCommand from '../commands/init'

const program = new Command()

// program.option('-d, --debug', 'output extra debugging')

program
  .command('init')
  .description('Setup Rel for your app')
  .action(InitCommand)

program
  .command('dev')
  .description('Start Rel in development mode')
  .arguments("<dir>")
  .option('-v, --verbose', "Make Rel more talkative")
  .action(DevCommand)

program.parse(process.argv)

const options = program.opts()
if (options.debug) console.log(options)
