"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUsingPlugins = void 0;
const tslib_1 = require("tslib");
const path_1 = require("path");
const fs_1 = require("fs");
const chokidar_1 = require("chokidar");
const debounce_1 = require("debounce");
const graphback_1 = require("graphback");
const graphql_config_1 = require("graphql-config");
const graphbackExtension_1 = require("../config/graphbackExtension");
const generateUsingPlugins = (cliFlags) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const config = yield graphql_config_1.loadConfig({
        rootDir: process.cwd(),
        extensions: [graphbackExtension_1.graphbackConfigExtension]
    });
    const project = config.getProject(cliFlags.project || 'default');
    const graphbackConfig = project.extension(graphbackExtension_1.graphbackExtension);
    if (!graphbackConfig) {
        throw new Error(`You should provide a valid '${graphbackExtension_1.graphbackExtension}' config to generate schema from data model`);
    }
    if (!graphbackConfig.model) {
        throw new Error(`' ${graphbackExtension_1.graphbackExtension}' config missing 'model' value that is required`);
    }
    if (graphbackConfig.plugins && graphbackConfig.plugins.length === 0) {
        throw new Error(`'${graphbackExtension_1.graphbackExtension}' config 'plugins' section is empty. No code will be generated`);
    }
    let { model } = graphbackConfig;
    // Formats the model path or list of paths to ensure
    // 1. only paths from inside the project are allowed
    // 2. if a directory is supplied *.graphql is appended
    if (typeof model === 'string' && fs_1.existsSync(model) && fs_1.lstatSync(model).isDirectory()) {
        model = path_1.join(config.dirpath, model, '/*.graphql');
    }
    else if (typeof model === 'string') {
        model = path_1.join(config.dirpath, model);
    }
    else if (Array.isArray(model)) {
        model = model.map((path) => path_1.join(config.dirpath, path));
    }
    const runGeneration = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const schemaDocument = yield project.loadSchema(model);
            const generator = new graphback_1.GraphbackGenerator(schemaDocument, graphbackConfig);
            generator.generateSourceCode();
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.log("error when executing generate", e);
        }
        // eslint-disable-next-line no-console
        console.info('Watching for changes...');
    });
    const debouncedExec = debounce_1.debounce(runGeneration, 100);
    if (cliFlags.watch) {
        chokidar_1.default.watch(model, {
            persistent: true,
            cwd: config.dirpath,
        }).on('all', debouncedExec);
    }
    else {
        const schemaDocument = yield project.loadSchema(model);
        const generator = new graphback_1.GraphbackGenerator(schemaDocument, graphbackConfig);
        generator.generateSourceCode();
    }
});
exports.generateUsingPlugins = generateUsingPlugins;
//# sourceMappingURL=generate.js.map