#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = void 0;
const tslib_1 = require("tslib");
const yargs = require("yargs");
const components_1 = require("./init/components");
const command = '$0 <name>';
exports.desc = 'Create Graphback project from available templates';
// tslint:disable-next-line: typedef
const builder = (args) => {
    args.positional('name', {
        describe: 'Project name',
        type: 'string'
    });
    args.option('templateName', {
        describe: 'Name of the predefined template',
        type: 'string'
    });
    args.option('templateUrl', {
        describe: 'GitHub URL of the template. For example (https://github.com/wtrocki/graphql-serve-example#master)',
        type: 'string'
    });
    args.option('filter', {
        describe: 'A filter option used to limit the number of displayed templates that only matches it. For example "postgres" will only display templates that have a Postgres backed',
        type: 'string'
    });
};
exports.builder = builder;
function handler({ name, templateName, templateUrl, filter }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield components_1.init(name, templateName, templateUrl, filter);
    });
}
exports.handler = handler;
if (require.main === module) {
    // eslint-disable-next-line no-unused-expressions
    yargs
        .command(command, exports.desc, exports.builder, handler)
        .example('$0 my-awesome-project', 'creates the "my-awesome-project" in the current working directory')
        .demandCommand(1)
        .strict()
        .recommendCommands()
        .help()
        .alias('h', 'help')
        .version()
        .alias('v', 'version').argv;
}
//# sourceMappingURL=index.js.map