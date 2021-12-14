"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphbackConfigExtension = exports.graphbackExtension = void 0;
const graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
exports.graphbackExtension = 'graphback';
/**
 * Config extension that register graphback plugin
 * @param api
 */
// eslint-disable-next-line @typescript-eslint/tslint/config
const graphbackConfigExtension = api => {
    //Schema
    api.loaders.schema.register(new graphql_file_loader_1.GraphQLFileLoader());
    return {
        name: exports.graphbackExtension
    };
};
exports.graphbackConfigExtension = graphbackConfigExtension;
//# sourceMappingURL=graphbackExtension.js.map