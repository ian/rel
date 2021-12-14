"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const tslib_1 = require("tslib");
const components_1 = require("../components");
const utils_1 = require("../utils");
exports.command = 'generate';
exports.desc = 'Generate GraphQL schema and resolvers';
exports.builder = {};
function handler() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield components_1.generateUsingPlugins({ project: 'default', silent: false, watch: false });
            utils_1.logInfo('Generation successful!');
        }
        catch (e) {
            utils_1.logError(`Generation failed: ${e}`);
        }
    });
}
exports.handler = handler;
//# sourceMappingURL=generate.js.map