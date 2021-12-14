"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./ClientDocuments"), exports);
tslib_1.__exportStar(require("./ClientCRUDPlugin"), exports);
//Required for plugins
var ClientCRUDPlugin_1 = require("./ClientCRUDPlugin");
Object.defineProperty(exports, "Plugin", { enumerable: true, get: function () { return ClientCRUDPlugin_1.ClientCRUDPlugin; } });
//# sourceMappingURL=index.js.map