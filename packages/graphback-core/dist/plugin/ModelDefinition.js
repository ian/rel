"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelByName = void 0;
function getModelByName(name, models) {
    if (!models) {
        return undefined;
    }
    return models.find((m) => m.graphqlType.name === name);
}
exports.getModelByName = getModelByName;
//# sourceMappingURL=ModelDefinition.js.map