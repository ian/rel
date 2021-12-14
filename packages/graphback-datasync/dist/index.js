"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./DataSyncPlugin"), exports);
tslib_1.__exportStar(require("./providers"), exports);
tslib_1.__exportStar(require("./services"), exports);
tslib_1.__exportStar(require("./util"), exports);
tslib_1.__exportStar(require("./helpers/createDataSync"), exports);
tslib_1.__exportStar(require("./deltaSource"), exports);
//Required for plugins
var DataSyncPlugin_1 = require("./DataSyncPlugin");
Object.defineProperty(exports, "Plugin", { enumerable: true, get: function () { return DataSyncPlugin_1.DataSyncPlugin; } });
//# sourceMappingURL=index.js.map