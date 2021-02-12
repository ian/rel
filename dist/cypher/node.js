"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cypherNode = void 0;
var params_1 = require("../util/params");
function cypherNode(optsOrLabel) {
    var _cypher = [];
    var name = optsOrLabel.name, params = optsOrLabel.params, label = optsOrLabel.label;
    _cypher.push(name);
    if (label)
        _cypher.push(":" + label);
    if (params)
        _cypher.push(" { " + params_1.paramify(params) + "} ");
    return "(" + _cypher.join("") + ")";
}
exports.cypherNode = cypherNode;
//# sourceMappingURL=node.js.map