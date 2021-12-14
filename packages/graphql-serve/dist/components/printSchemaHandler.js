"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printSchemaHandler = void 0;
const graphback_1 = require("graphback");
const loadModel_1 = require("../loadModel");
const codegen_schema_1 = require("@graphback/codegen-schema");
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
function printSchemaHandler(argv) {
    const schemaText = loadModel_1.loadModel(argv.model);
    const pluginEngine = new graphback_1.GraphbackPluginEngine({
        schema: schemaText,
        plugins: [new codegen_schema_1.SchemaCRUDPlugin()],
        config: { crudMethods: {} }
    });
    const metadata = pluginEngine.createResources();
    const schema = metadata.getSchema();
    return graphback_1.printSchemaWithDirectives(schema);
}
exports.printSchemaHandler = printSchemaHandler;
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable @typescript-eslint/no-unsafe-call */
/* eslint-enable @typescript-eslint/no-unsafe-return */
//# sourceMappingURL=printSchemaHandler.js.map