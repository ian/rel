var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  GraphbackGenerator: () => GraphbackGenerator,
  buildGraphbackAPI: () => buildGraphbackAPI
});
__reExport(src_exports, require("@graphback/core"));

// src/buildGraphbackAPI.ts
var import_core = require("@graphback/core");
var import_codegen_schema = require("@graphback/codegen-schema");
var import_merge = require("@graphql-tools/merge");
var import_graphql_subscriptions = require("graphql-subscriptions");
function createServices(models, createService, createProvider) {
  const services = {};
  for (const model of models) {
    const modelType = model.graphqlType;
    const modelProvider = createProvider(model);
    const modelService = createService(model, modelProvider);
    services[modelType.name] = modelService;
  }
  return services;
}
function getPlugins(plugins) {
  plugins = plugins != null || [];
  const pluginsMap = plugins.reduce((acc, plugin) => {
    if (acc[plugin.getPluginName()]) {
      console.debug(`Plugin ${plugin.getPluginName()} is already defined and will be overridden`);
    }
    acc[plugin.getPluginName()] = plugin;
    return acc;
  }, {});
  let schemaPlugin;
  if (pluginsMap[import_codegen_schema.SCHEMA_CRUD_PLUGIN_NAME]) {
    schemaPlugin = pluginsMap[import_codegen_schema.SCHEMA_CRUD_PLUGIN_NAME];
    delete pluginsMap[import_codegen_schema.SCHEMA_CRUD_PLUGIN_NAME];
  }
  return [
    schemaPlugin || new import_codegen_schema.SchemaCRUDPlugin(),
    ...Object.values(pluginsMap)
  ];
}
function buildGraphbackAPI(model, config) {
  const schemaPlugins = getPlugins(config.plugins);
  const pluginEngine = new import_core.GraphbackPluginEngine({
    schema: model,
    plugins: schemaPlugins,
    config: { crudMethods: config.crud }
  });
  const metadata = pluginEngine.createResources();
  const models = metadata.getModelDefinitions();
  const serviceCreator = config.serviceCreator || (0, import_core.createCRUDService)({ pubSub: new import_graphql_subscriptions.PubSub() });
  const services = createServices(models, serviceCreator, config.dataProviderCreator);
  const contextCreator = (context) => {
    return __spreadProps(__spreadValues({}, context), {
      graphback: services
    });
  };
  const resolvers = metadata.getResolvers();
  const schemaWithResolvers = (0, import_merge.mergeSchemas)({ schemas: [metadata.getSchema()], resolvers });
  const typeDefs = (0, import_core.printSchemaWithDirectives)(schemaWithResolvers);
  return {
    schema: schemaWithResolvers,
    typeDefs,
    resolvers,
    services,
    contextCreator
  };
}

// src/GraphbackGenerator.ts
var import_core2 = require("@graphback/core");

// src/loadPlugins.ts
function loadPlugins(pluginConfigMap) {
  if (!pluginConfigMap) {
    return [];
  }
  const pluginInstances = [];
  for (const pluginLabel of Object.keys(pluginConfigMap)) {
    let pluginName = pluginLabel;
    if (pluginLabel.startsWith("graphback-")) {
      pluginName = pluginLabel.replace("graphback-", "@graphback/codegen-");
    }
    const packageName = pluginConfigMap[pluginLabel].packageName;
    if (packageName) {
      pluginName = packageName;
    }
    try {
      const plugin = require(pluginName);
      if (plugin.Plugin) {
        const config = pluginConfigMap[pluginLabel];
        pluginInstances.push(new plugin.Plugin(config));
      } else {
        console.log(`${pluginName} plugin is not exporting 'Plugin' class`);
      }
    } catch (e) {
      console.log(`${pluginName} plugin missing in package.json`, e);
    }
  }
  return pluginInstances;
}

// src/GraphbackGenerator.ts
var GraphbackGenerator = class {
  config;
  schema;
  constructor(schema, config) {
    this.schema = schema;
    this.config = config;
  }
  generateSourceCode() {
    const plugins = loadPlugins(this.config.plugins);
    const pluginEngine = new import_core2.GraphbackPluginEngine({
      schema: this.schema,
      plugins,
      config: { crudMethods: this.config.crud }
    });
    pluginEngine.createResources();
  }
};
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GraphbackGenerator,
  buildGraphbackAPI
});
