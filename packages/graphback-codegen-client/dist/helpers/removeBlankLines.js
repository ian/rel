"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBlankLines = void 0;
function removeBlankLines(text = '') {
    return text.replace(/^\s*\n/gm, "");
}
exports.removeBlankLines = removeBlankLines;
//# sourceMappingURL=removeBlankLines.js.map