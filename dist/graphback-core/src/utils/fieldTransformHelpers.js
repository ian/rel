import { parseMetadata } from 'graphql-metadata';
/* eslint-disable no-shadow */
export var TransformType;
(function (TransformType) {
    TransformType["UPDATE"] = "onUpdateFieldTransform";
    TransformType["CREATE"] = "onCreateFieldTransform";
})(TransformType || (TransformType = {}));
export function getFieldTransformations(baseType) {
    const fieldMap = baseType.getFields();
    const fieldTransformMap = {
        [TransformType.CREATE]: [],
        [TransformType.UPDATE]: []
    };
    for (const field of Object.values(fieldMap)) {
        if (parseMetadata('updatedAt', field.description)) {
            fieldTransformMap[TransformType.UPDATE].push({
                fieldName: field.name,
                transform: () => {
                    return new Date().getTime();
                }
            });
            fieldTransformMap[TransformType.CREATE].push({
                fieldName: field.name,
                transform: () => {
                    return new Date().getTime();
                }
            });
        }
        if (parseMetadata('createdAt', field.description)) {
            fieldTransformMap[TransformType.CREATE].push({
                fieldName: field.name,
                transform: () => {
                    return new Date().getTime();
                }
            });
        }
    }
    return fieldTransformMap;
}
//# sourceMappingURL=fieldTransformHelpers.js.map