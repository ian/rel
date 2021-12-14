"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printSchemaWithDirectives = void 0;
const graphql_compose_1 = require("graphql-compose");
function printSchemaWithDirectives(schemaOrSDL) {
    const schemaComposer = new graphql_compose_1.SchemaComposer(schemaOrSDL);
    return schemaComposer.toSDL({ exclude: ['String', 'ID', 'Boolean', 'Float', 'Int'] });
}
exports.printSchemaWithDirectives = printSchemaWithDirectives;
//# sourceMappingURL=printSchemaWithDirectives.js.map