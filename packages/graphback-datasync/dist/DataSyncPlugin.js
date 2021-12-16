"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSyncPlugin = exports.DATASYNC_PLUGIN_NAME = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const graphql_1 = require("graphql");
const core_1 = require("@graphback/core");
const deltaMappingHelper_1 = require("./deltaMappingHelper");
const util_1 = require("./util");
exports.DATASYNC_PLUGIN_NAME = "DataSyncPlugin";
/**
 * DataSync plugin
 *
 * Plugin is enabled by """ @datasync """ annotation
 * It will generate delta queries
 */
class DataSyncPlugin extends core_1.GraphbackPlugin {
    constructor(config) {
        super();
        this.config = Object.assign({ conflictConfig: {} }, config);
    }
    transformSchema(metadata) {
        var _a;
        const schema = metadata.getSchema();
        const schemaComposer = new graphql_compose_1.SchemaComposer(schema);
        if (!schemaComposer.has(core_1.Timestamp.name)) {
            schemaComposer.createScalarTC(core_1.Timestamp);
        }
        const models = metadata.getModelDefinitions();
        if (models.length === 0) {
            this.logWarning("Provided schema has no models. Returning original schema without any changes.");
            return schema;
        }
        const modelConflictConfigSet = new Set(Object.keys(((_a = this.config.conflictConfig) === null || _a === void 0 ? void 0 : _a.models) || {}));
        let dataSyncModelCount = 0;
        models.forEach((model) => {
            // Diff queries
            if (util_1.isDataSyncModel(model)) {
                dataSyncModelCount += 1;
                modelConflictConfigSet.delete(model.graphqlType.name);
                this.addDataSyncFieldsToModel(schemaComposer, model);
                this.addDataSyncFieldsToInputTypes(schemaComposer, model);
                this.addDeltaQuery(schemaComposer, model);
            }
        });
        if (dataSyncModelCount === 0) {
            // eslint-disable-next-line no-console
            console.warn("No DataSync Models detected, ensure that your models are properly annotated.");
        }
        if (modelConflictConfigSet.size !== 0) {
            // eslint-disable-next-line no-console
            console.info(`The following models from conflictConfig could not be found, consider adding them to the schema and/or adding the @datasync annotation if you have not done so:\n${Array.from(modelConflictConfigSet).join('\n')} `);
        }
        return graphql_1.buildSchema(schemaComposer.toSDL());
    }
    /**
     * Creates resolvers for Data Synchonization
     *
     * @param {GraphbackCoreMetadata} metadata - Core metatata containing all model information
     */
    createResolvers(metadata) {
        const models = metadata.getModelDefinitions();
        if (models.length === 0) {
            return undefined;
        }
        const resolvers = {};
        for (const model of models) {
            // If delta marker is encountered, add resolver for `delta` query
            if (util_1.isDataSyncModel(model)) {
                this.addDeltaSyncResolver(model, resolvers);
            }
        }
        return resolvers;
    }
    createResources(metadata) {
        // TODO generate delta resolvers
        // TODO DataSource support for deltas
        // Schema plugin is going to create schema for us
        // No work to be done
    }
    getPluginName() {
        return exports.DATASYNC_PLUGIN_NAME;
    }
    addDeltaSyncResolver(model, resolvers) {
        const modelName = model.graphqlType.name;
        const deltaQuery = deltaMappingHelper_1.getDeltaQuery(modelName);
        if (!resolvers.Query) {
            resolvers.Query = {};
        }
        resolvers.Query[deltaQuery] = (_, args, context, info) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!context.graphback || !context.graphback[modelName]) {
                throw new Error(`Missing service for ${modelName}`);
            }
            const dataSyncService = util_1.isDataSyncService(context.graphback[modelName]);
            if (dataSyncService === undefined) {
                throw Error("Service is not a DataSyncCRUDService. Please use DataSyncCRUDService and DataSync-compliant DataProvider with DataSync Plugin to get Delta Queries.");
            }
            return dataSyncService.sync(args.lastSync, info, args.filter, args.limit);
        });
    }
    addDataSyncFieldsToModel(schemaComposer, model) {
        const name = model.graphqlType.name;
        const modelTC = schemaComposer.getOTC(name);
        const TimestampSTC = schemaComposer.getSTC(core_1.Timestamp.name);
        modelTC.addFields({
            [util_1.DataSyncFieldNames.lastUpdatedAt]: {
                type: TimestampSTC.getType(),
                description: "@index(name: 'Datasync_lastUpdatedAt')"
            }
        });
        const modelUsesVersion = util_1.getModelConfigFromGlobal(model.graphqlType.name, this.config.conflictConfig).enabled;
        if (modelUsesVersion) {
            modelTC.addFields({
                [util_1.DataSyncFieldNames.version]: {
                    type: graphql_1.GraphQLInt
                }
            });
        }
    }
    addDataSyncFieldsToInputTypes(schemaComposer, model) {
        // Add _version argument to UpdateInputType
        const updateInputType = schemaComposer.getITC(core_1.getInputTypeName(model.graphqlType.name, core_1.GraphbackOperationType.UPDATE));
        const modelUsesVersion = util_1.getModelConfigFromGlobal(model.graphqlType.name, this.config.conflictConfig).enabled;
        if (modelUsesVersion && updateInputType) {
            updateInputType.addFields({
                [util_1.DataSyncFieldNames.version]: {
                    type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
                }
            });
        }
    }
    addDeltaQuery(schemaComposer, model) {
        // Create Delta Type
        const modelName = model.graphqlType.name;
        const modelTC = schemaComposer.getOTC(modelName);
        const updateInputType = schemaComposer.getITC(core_1.getInputTypeName(model.graphqlType.name, core_1.GraphbackOperationType.UPDATE));
        const TimestampSTC = schemaComposer.getSTC(core_1.Timestamp.name);
        // Add Delta Type to schema
        const DeltaOTC = schemaComposer.createObjectTC({
            name: deltaMappingHelper_1.getDeltaType(modelName),
        });
        const allFields = Object.values(updateInputType.getType().getFields());
        for (const field of allFields) {
            DeltaOTC.addFields({ [field.name]: field.type.toString() });
        }
        DeltaOTC.addFields({
            [util_1.DataSyncFieldNames.lastUpdatedAt]: {
                type: TimestampSTC.getType(),
                description: "@index(name: 'Datasync_lastUpdatedAt')"
            }
        });
        DeltaOTC.addFields({
            [util_1.DataSyncFieldNames.deleted]: graphql_1.GraphQLBoolean
        });
        // Create and Add Delta List type to schema
        const DeltaListOTC = schemaComposer.createObjectTC({
            name: deltaMappingHelper_1.getDeltaListType(modelName),
            fields: {
                items: graphql_1.GraphQLNonNull(graphql_1.GraphQLList(DeltaOTC.getType())),
                lastSync: graphql_1.GraphQLNonNull(TimestampSTC.getType()),
                limit: graphql_1.GraphQLInt
            }
        });
        // Add Delta Queries
        const deltaQuery = deltaMappingHelper_1.getDeltaQuery(model.graphqlType.name);
        schemaComposer.Query.addFields({
            [deltaQuery]: graphql_1.GraphQLNonNull(DeltaListOTC.getType())
        });
        const findFilterITC = schemaComposer.getITC(core_1.getInputTypeName(modelName, core_1.GraphbackOperationType.FIND));
        schemaComposer.Query.addFieldArgs(deltaQuery, {
            lastSync: graphql_1.GraphQLNonNull(TimestampSTC.getType()),
            filter: findFilterITC.getType(),
            limit: graphql_1.GraphQLInt
        });
    }
}
exports.DataSyncPlugin = DataSyncPlugin;
//# sourceMappingURL=DataSyncPlugin.js.map