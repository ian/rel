"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveHandler = void 0;
const tslib_1 = require("tslib");
const GraphbackServer_1 = require("../GraphbackServer");
const serveHandler = (argv) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const datasyncServeConfig = { datasync: !!argv.datasync, conflict: argv.conflict, deltaTTL: argv.deltaTTL };
    const server = yield GraphbackServer_1.buildGraphbackServer(argv.model, datasyncServeConfig);
    if ('port' in argv) {
        const portNumber = argv.port;
        if (isNaN(portNumber)) {
            console.log("\nSpecified port number is NaN, terminating...\n");
        }
        else {
            console.log("\nStarting server...\n");
            yield server.start(portNumber);
        }
    }
    else {
        console.log("\nNo port number specified.\nStarting server on random available port...\n");
        yield server.start();
    }
});
exports.serveHandler = serveHandler;
//# sourceMappingURL=serveHandler.js.map