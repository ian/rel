#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printSchema = exports.serve = void 0;
const tslib_1 = require("tslib");
const yargs = require("yargs");
const serve = require("./commands/serve");
exports.serve = serve;
const printSchema = require("./commands/printSchema");
exports.printSchema = printSchema;
tslib_1.__exportStar(require("./GraphbackServer"), exports);
tslib_1.__exportStar(require("./loadModel"), exports);
tslib_1.__exportStar(require("./runtime"), exports);
tslib_1.__exportStar(require("./components"), exports);
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