"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const chalk = require("chalk");
const components_1 = require("../components");
exports.command = 'print-schema [modelDir]';
exports.desc = 'Generate and print GraphQL schema from data model files';
// tslint:disable-next-line: typedef
const builder = (args) => {
    args.positional('modelDir', {
        describe: 'Directory to search for data models',
        type: 'string',
        alias: 'model'
    });
    args.example('$0 print-schema modelDir', 'only display generated schema from data model files in modelDir directory and quit');
};
exports.builder = builder;
function handler(args) {
    const schemaSDL = components_1.printSchemaHandler(args);
    console.log("Generated schema:\n");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    console.log(chalk.cyan(schemaSDL));
}
exports.handler = handler;
//# sourceMappingURL=printSchema.js.map