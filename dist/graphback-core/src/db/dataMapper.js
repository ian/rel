function getTableId(idField, data) {
    if (!idField) {
        return undefined;
    }
    ;
    let value;
    if (data && data[idField]) {
        value = data[idField];
    }
    return {
        name: idField,
        value
    };
}
export const getDatabaseArguments = (modelMap, data) => {
    const idField = modelMap.idField;
    // Transform data if it defined
    let transFormedData;
    if (data) {
        const keys = Object.keys(data);
        transFormedData = {};
        for (const key of keys) {
            const value = data[key];
            transFormedData[key] = value && typeof value === 'object' ? JSON.stringify(value) : value;
        }
    }
    ;
    return {
        idField: getTableId(idField, data),
        data: transFormedData
    };
};
//# sourceMappingURL=dataMapper.js.map