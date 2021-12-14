"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadModel = void 0;
/* eslint-disable @typescript-eslint/no-use-before-define */
const load_1 = require("@graphql-tools/load");
const graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Loads the schema object from the directory or URL
 *
 * @export
 * @param {string} modelDir
 * @returns {string}
 */
function loadModel(modelPath) {
    modelPath = resolveModelPath(modelPath);
    const modelDefs = load_1.loadSchemaSync(modelPath, {
        loaders: [
            new graphql_file_loader_1.GraphQLFileLoader()
        ]
    });
    return modelDefs;
}
exports.loadModel = loadModel;
function resolveModelPath(modelPath) {
    let fullModelPath = path_1.join(process.cwd(), modelPath);
    if (typeof modelPath === 'string' && fs_1.existsSync(fullModelPath) && fs_1.lstatSync(fullModelPath).isDirectory()) {
        fullModelPath = path_1.join(fullModelPath, '*.graphql');
    }
    return fullModelPath;
}
//# sourceMappingURL=loadModel.js.map