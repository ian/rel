var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// src/index.ts
export * from "@graphback/core";

// src/buildGraphbackAPI.ts
import { GraphbackPluginEngine, printSchemaWithDirectives, createCRUDService } from "@graphback/core";
import { SchemaCRUDPlugin, SCHEMA_CRUD_PLUGIN_NAME } from "@graphback/codegen-schema";
import { mergeSchemas } from "@graphql-tools/merge";
import { PubSub } from "graphql-subscriptions";
import { constraintDirective } from "graphql-constraint-directive";
async function createServices(models, createService, createProvider) {
  const services = {};
  for (const model of models) {
    const modelType = model.graphqlType;
    const modelProvider = createProvider(model);
    const modelService = await createService(model, modelProvider);
    services[modelType.name] = modelService;
  }
  return services;
}
function getPlugins(plugins) {
  const pluginsMap = (plugins == null ? void 0 : plugins.reduce((acc, plugin) => {
    if (acc[plugin.getPluginName()]) {
      console.debug(`Plugin ${plugin.getPluginName()} is already defined and will be overridden`);
    }
    acc[plugin.getPluginName()] = plugin;
    return acc;
  }, {})) || {};
  let schemaPlugin;
  if (pluginsMap[SCHEMA_CRUD_PLUGIN_NAME]) {
    schemaPlugin = pluginsMap[SCHEMA_CRUD_PLUGIN_NAME];
    delete pluginsMap[SCHEMA_CRUD_PLUGIN_NAME];
  }
  return [
    schemaPlugin || new SchemaCRUDPlugin(),
    ...Object.values(pluginsMap)
  ];
}
async function buildGraphbackAPI(model, config = {}) {
  const schemaPlugins = getPlugins(config.plugins);
  const pluginEngine = new GraphbackPluginEngine({
    schema: model,
    plugins: schemaPlugins
  });
  const metadata = pluginEngine.createResources();
  const models = metadata.getModelDefinitions();
  const serviceCreator = config.serviceCreator || createCRUDService({ pubSub: new PubSub() });
  const services = await createServices(models, serviceCreator, config.dataProviderCreator);
  const contextCreator = (context) => {
    return __spreadProps(__spreadValues({}, context), {
      graphback: services
    });
  };
  const resolvers = metadata.getResolvers();
  const schema = constraintDirective()(metadata.getSchema());
  const schemaWithResolvers = mergeSchemas({ schemas: [schema], resolvers });
  const typeDefs = printSchemaWithDirectives(schemaWithResolvers);
  return {
    schema: schemaWithResolvers,
    typeDefs,
    resolvers,
    services,
    contextCreator
  };
}

// src/GraphbackGenerator.ts
import { GraphbackPluginEngine as GraphbackPluginEngine2 } from "@graphback/core";

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
      const plugin = __require(pluginName);
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
    const pluginEngine = new GraphbackPluginEngine2({
      schema: this.schema,
      plugins
    });
    pluginEngine.createResources();
  }
};
export {
  GraphbackGenerator,
  buildGraphbackAPI
};
//# sourceMappingURL=index.mjs.map