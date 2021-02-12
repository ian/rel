"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
var types_1 = require("./types");
var find_1 = require("./find");
var list_1 = require("./list");
function generate(obj) {
    var typeSchema = {};
    var querySchema = {};
    var mutationSchema = {};
    var queryResolvers = {};
    var mutationResolvers = {};
    Object.entries(obj).forEach(function (types) {
        var name = types[0], def = types[1];
        var _a = def, fields = _a.fields, accessors = _a.accessors;
        typeSchema[name] = types_1.convertToSchemaType(name, fields);
        if (accessors) {
            if (accessors.find) {
                var _b = find_1.convertToSchemaFindQuery(name, accessors.find, fields), schemaName = _b.name, schemaDef = _b.definition;
                querySchema[schemaName] = schemaDef;
                var _c = find_1.convertToResoverFindQuery(name, accessors.find), resolverName = _c.name, resolverHandler = _c.handler;
                queryResolvers[resolverName] = resolverHandler;
            }
            if (accessors.list) {
                var _d = list_1.convertToSchemaListQuery(name, accessors.list, fields), schemaName = _d.name, schemaDef = _d.definition;
                querySchema[schemaName] = schemaDef;
                var _e = list_1.convertToResoverListQuery(name, accessors.list), resolverName = _e.name, resolverHandler = _e.handler;
                queryResolvers[resolverName] = resolverHandler;
            }
        }
    });
    var gqlSchema = [
        "\nscalar ID\nscalar Date\nscalar Time\nscalar DateTime\nscalar PhoneNumber\nscalar URL\nscalar UUID",
        Object.values(typeSchema).join("\n\n"),
    ];
    gqlSchema.push("type Query {\n  " + Object.values(querySchema).join("\n  ") + "\n}");
    gqlSchema.push("type Mutation {\n  " + Object.values(mutationSchema).join("\n  ") + "\n  SystemStatus: Boolean!\n}");
    return {
        schema: gqlSchema.join("\n\n"),
        resolvers: {
            Query: queryResolvers,
            Mutation: mutationResolvers,
        },
    };
}
exports.generate = generate;
//# sourceMappingURL=index.js.map