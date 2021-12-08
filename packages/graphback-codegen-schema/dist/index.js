"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./SchemaCRUDPlugin"), exports);
tslib_1.__exportStar(require("./definitions/schemaDefinitions"), exports);
//Required for plugins
var SchemaCRUDPlugin_1 = require("./SchemaCRUDPlugin");
Object.defineProperty(exports, "Plugin", { enumerable: true, get: function () { return SchemaCRUDPlugin_1.SchemaCRUDPlugin; } });
//# sourceMappingURL=index.js.map