import { SchemaComposer } from 'graphql-compose';
export function printSchemaWithDirectives(schemaOrSDL) {
    const schemaComposer = new SchemaComposer(schemaOrSDL);
    return schemaComposer.toSDL({ exclude: ['String', 'ID', 'Boolean', 'Float', 'Int'] });
}
//# sourceMappingURL=printSchemaWithDirectives.js.map