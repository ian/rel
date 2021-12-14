"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldTransformations = exports.TransformType = void 0;
const graphql_metadata_1 = require("graphql-metadata");
/* eslint-disable no-shadow */
var TransformType;
(function (TransformType) {
    TransformType["UPDATE"] = "onUpdateFieldTransform";
    TransformType["CREATE"] = "onCreateFieldTransform";
})(TransformType = exports.TransformType || (exports.TransformType = {}));
function getFieldTransformations(baseType) {
    const fieldMap = baseType.getFields();
    const fieldTransformMap = {
        [TransformType.CREATE]: [],
        [TransformType.UPDATE]: [],
    };
    for (const field of Object.values(fieldMap)) {
        if (graphql_metadata_1.parseMetadata('updatedAt', field.description)) {
            fieldTransformMap[TransformType.UPDATE].push({
                fieldName: field.name,
                transform: () => {
                    return new Date().getTime();
                },
            });
            fieldTransformMap[TransformType.CREATE].push({
                fieldName: field.name,
                transform: () => {
                    return new Date().getTime();
                },
            });
        }
        if (graphql_metadata_1.parseMetadata('createdAt', field.description)) {
            fieldTransformMap[TransformType.CREATE].push({
                fieldName: field.name,
                transform: () => {
                    return new Date().getTime();
                },
            });
        }
    }
    return fieldTransformMap;
}
exports.getFieldTransformations = getFieldTransformations;
//# sourceMappingURL=fieldTransformHelpers.js.map