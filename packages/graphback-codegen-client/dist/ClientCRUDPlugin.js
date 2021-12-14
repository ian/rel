"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientCRUDPlugin = exports.CLIENT_CRUD_PLUGIN = void 0;
const path_1 = require("path");
const core_1 = require("@graphback/core");
const writeDocuments_1 = require("./helpers/writeDocuments");
const templates_1 = require("./templates");
exports.CLIENT_CRUD_PLUGIN = "ClientCRUDPlugin";
/**
 * Graphback CRUD operations plugin
 *
 * Plugins generates client side documents containing CRUD operations:
 * Queries, Mutations and Subscriptions that reference coresponding schema and resolves.
 * Plugin operates on all types annotated with model
 *
 * Used graphql metadata:
 *
 * - model: marks type to be processed by CRUD generator
 * - crud: controls what types of operations can be generated.
 * For example crud.update: false will disable updates for type
 */
class ClientCRUDPlugin extends core_1.GraphbackPlugin {
    constructor(pluginConfig) {
        super();
        this.pluginConfig = pluginConfig;
        if (!pluginConfig.outputFile) {
            throw new Error("client plugin requires outputFile parameter");
        }
    }
    createResources(metadata) {
        const documents = this.getDocuments(metadata);
        writeDocuments_1.writeDocumentsToFilesystem(this.pluginConfig.outputFile, documents);
    }
    getPluginName() {
        return exports.CLIENT_CRUD_PLUGIN;
    }
    getDocuments(metadata) {
        const models = metadata.getModelDefinitions();
        if (models.length === 0) {
            this.logWarning("Provided schema has no models. No client side queries will be generated");
        }
        let documents;
        // Extract the file extension from the plugin config
        const outputFileAsPath = path_1.parse(this.pluginConfig.outputFile);
        const documentExtension = outputFileAsPath.ext;
        const supportedFileExtensions = ['.ts', '.graphql'];
        if (!supportedFileExtensions.includes(documentExtension)) {
            throw new Error(`ClientCRUD plugin outputFile requires a file extension of either: ${supportedFileExtensions.join(', ')}`);
        }
        if (documentExtension === '.ts') {
            documents = templates_1.createClientDocumentsTS(models);
        }
        else if (documentExtension === '.graphql') {
            documents = templates_1.createClientDocumentsGQL(models);
        }
        else {
            throw new Error("Invalid output format for client plugin");
        }
        if (this.pluginConfig.fragmentOnly) {
            documents = {
                fragments: documents.fragments,
                queries: [],
                mutations: [],
                subscriptions: [],
            };
        }
        return documents;
    }
}
exports.ClientCRUDPlugin = ClientCRUDPlugin;
//# sourceMappingURL=ClientCRUDPlugin.js.map