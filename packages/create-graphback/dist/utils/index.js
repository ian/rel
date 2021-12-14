"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDetail = exports.logInfo = exports.logError = exports.log = void 0;
const chalk = require("chalk");
const emoji = require("node-emoji");
// eslint-disable-next-line no-console
exports.log = console.log;
const logError = (s) => exports.log(emoji.emojify(chalk.default.red(s).bold()));
exports.logError = logError;
const logInfo = (s) => exports.log(emoji.emojify(chalk.default.bold(s)));
exports.logInfo = logInfo;
const logDetail = (s) => exports.log(emoji.emojify(chalk.default.dim(s)));
exports.logDetail = logDetail;
//# sourceMappingURL=index.js.map