#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const yargs = require("yargs");
tslib_1.__exportStar(require("./components"), exports);
tslib_1.__exportStar(require("./commands/generate"), exports);
if (require.main === module) {
    // eslint-disable-next-line no-unused-expressions
    yargs
        .commandDir('commands')
        .demandCommand(1)
        .strict()
        .recommendCommands()
        .help()
        .alias('h', 'help')
        .version()
        .alias('v', 'version')
        .argv;
}
//# sourceMappingURL=index.js.map