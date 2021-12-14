"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printReturnFields = exports.buildReturnFields = void 0;
const graphql_1 = require("graphql");
const removeBlankLines_1 = require("../helpers/removeBlankLines");
/**
 * For given type - it returns list of the type fields that
 * can be used for building GraphQL Fragment
 *
 *
 * @param t type that is going to be used
 * @param level nested level (supports only 0, 1 nested level)
 */
function buildReturnFields(t, level) {
    const fieldsMap = t.getFields();
    if (level > 1) {
        throw new Error("Function supports only 1 nested level");
    }
    //tslint:disable-next-line: typedef
    return Object.keys(fieldsMap).reduce((data, key) => {
        const field = fieldsMap[key];
        const modelType = graphql_1.getNamedType(field.type);
        if (graphql_1.isCompositeType(modelType)) {
            if (level !== 0) {
                data.push({
                    [field.name]: buildReturnFields(modelType, level - 1)
                });
            }
            //Nested relation that should not be included
            return data;
        }
        data.push(field.name);
        return data;
    }, []);
}
exports.buildReturnFields = buildReturnFields;
const printReturnFields = (resultArray, shift = '') => {
    let resultString = '';
    for (const element of resultArray) {
        if (element instanceof Object) {
            const key = Object.keys(element)[0];
            const nestedElements = exports.printReturnFields(element[key], '   ');
            resultString += `\n   ${key} {\n${nestedElements}   }`;
        }
        else {
            resultString += `${shift}   ${element}\n`;
        }
    }
    return removeBlankLines_1.removeBlankLines(resultString);
};
exports.printReturnFields = printReturnFields;
//# sourceMappingURL=fragmentFields.js.map