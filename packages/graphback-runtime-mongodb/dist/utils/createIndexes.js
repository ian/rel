"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelationIndex = exports.getCustomIndex = exports.getIndexFields = exports.applyIndexes = exports.findAndCreateIndexes = void 0;
const tslib_1 = require("tslib");
const graphql_metadata_1 = require("graphql-metadata");
const core_1 = require("@graphback/core");
function findAndCreateIndexes(baseType, collection) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const indexes = getIndexFields(baseType);
        yield applyIndexes(indexes, collection);
    });
}
exports.findAndCreateIndexes = findAndCreateIndexes;
function applyIndexes(indexes, collection) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (indexes.length === 0) {
            return;
        }
        collection.createIndexes(indexes).catch((error) => {
            let message;
            if (error.codeName === "IndexOptionsConflict") {
                // This Index exists but with a different name
                message = `${error.errmsg}, try dropping the existing index or using the same name.`;
            }
            if (error.codeName === "IndexKeySpecsConflict") {
                // Another Index with same name exists
                message = `${error.errmsg}, try manually dropping the existing index or using a different name.`;
            }
            if (error.codeName === "InvalidIndexSpecificationOption") {
                // Invalid options passed to @index
                message = `${error.errmsg}, try double checking what you are passing to @index.`;
            }
            if (message === undefined) {
                message = `Graphback was unable to create the specified indexes: ${error.message}.`;
            }
            // eslint-disable-next-line no-console
            console.error(`${message} If all else fails, try recreating the index manually.`);
        });
    });
}
exports.applyIndexes = applyIndexes;
function getIndexFields(baseType) {
    const res = [];
    const fields = baseType.getFields();
    Object.keys(fields).forEach((k) => {
        const field = fields[k];
        // Add Index on relation fields
        const relationIndex = getRelationIndex(field);
        if (relationIndex !== undefined) {
            res.push(relationIndex);
            return;
        }
        // Add custom Index if found e.g. @index
        const customIndex = getCustomIndex(field);
        if (customIndex !== undefined) {
            res.push(customIndex);
        }
    });
    return res;
}
exports.getIndexFields = getIndexFields;
function getCustomIndex(field) {
    const indexMetadata = graphql_metadata_1.parseMetadata('index', field.description);
    if (indexMetadata) {
        const indexSpec = Object.assign({
            key: {
                [field.name]: 1
            }
        }, indexMetadata);
        return indexSpec;
    }
    else {
        return undefined;
    }
}
exports.getCustomIndex = getCustomIndex;
function getRelationIndex(field) {
    const relationshipData = core_1.parseRelationshipAnnotation(field.description);
    if ((relationshipData === null || relationshipData === void 0 ? void 0 : relationshipData.kind) && ['manyToOne', 'manyToMany'].includes(relationshipData.kind)) {
        return {
            key: {
                [relationshipData.key]: 1
            },
        };
    }
    else {
        return undefined;
    }
}
exports.getRelationIndex = getRelationIndex;
//# sourceMappingURL=createIndexes.js.map