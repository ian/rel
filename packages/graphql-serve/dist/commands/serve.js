"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const tslib_1 = require("tslib");
const serveHandler_1 = require("../components/serveHandler");
const runtime_1 = require("../runtime");
exports.command = 'serve [modelDir] [options]';
exports.desc = 'Generate and start GraphQL server from data model files';
// tslint:disable-next-line: typedef
const builder = (args) => {
    args.positional('modelDir', {
        describe: 'Directory to search for data models',
        type: 'string',
        alias: 'model'
    });
    args.option('port', {
        describe: 'Specify the port on which to listen on',
        type: 'number',
        alias: 'p'
    });
    args.option('datasync', {
        describe: 'Enable data synchronization features',
        type: 'boolean',
        alias: 'ds'
    });
    args.option('conflict', {
        describe: "Specify a conflict resolution strategy with --datasync",
        type: 'string',
        choices: Object.keys(runtime_1.ConflictStrategyMap)
    });
    args.option('deltaTTL', {
        describe: "Specify a TTL for delta tables with --datasync",
        type: "number"
    });
    args.example('$0 serve . -p 8080', 'generate schema from data model files in current directory and start GraphQL server on port 8080');
};
exports.builder = builder;
function handler(args) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield serveHandler_1.serveHandler(args);
    });
}
exports.handler = handler;
//# sourceMappingURL=serve.js.map