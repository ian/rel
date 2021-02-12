"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cypherRel = void 0;
function cypherRel(rel) {
    var _a = rel, name = _a.name, direction = _a.direction, label = _a.label;
    switch (direction) {
        case "inbound":
            return "<-[" + name + ":" + label + "]-";
        case "outbound":
            return "-[" + name + ":" + label + "]->";
        default:
            return "-[" + name + ":" + label + "]-";
    }
}
exports.cypherRel = cypherRel;
//# sourceMappingURL=rel.js.map