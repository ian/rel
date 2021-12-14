"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseArguments = void 0;
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
const getDatabaseArguments = (modelMap, data) => {
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
exports.getDatabaseArguments = getDatabaseArguments;
//# sourceMappingURL=dataMapper.js.map