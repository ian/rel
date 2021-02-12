"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToSchemaType = void 0;
function convertToSchemaType(name, fields) {
    var gqlFields = [];
    gqlFields.push("id: UUID!");
    Object.entries(fields).forEach(function (fieldObj) {
        var key = fieldObj[0], field = fieldObj[1];
        gqlFields.push("  " + key + ": " + field.gqlName + (field.isRequired ? "!" : ""));
    });
    gqlFields.push("  createdAt: DateTime!");
    return "type " + name + " { \n  " + gqlFields.join("\n") + "\n}";
}
exports.convertToSchemaType = convertToSchemaType;
//# sourceMappingURL=types.js.map