export function getModelByName(name, models) {
    if (!models) {
        return undefined;
    }
    return models.find((m) => m.graphqlType.name === name);
}
//# sourceMappingURL=ModelDefinition.js.map