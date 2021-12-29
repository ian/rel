//tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { readFileSync } from 'fs';
import { buildSchema, print } from 'graphql';
import { GraphbackPlugin, GraphbackPluginEngine } from '../src';
const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8');
/**
 * Testing engine
 */
class TestPlugin extends GraphbackPlugin {
    generateCallback;
    //eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(generateCallback) {
        super();
        this.generateCallback = generateCallback;
    }
    transformSchema(metadata) {
        const schema = metadata.getSchema();
        schema.getQueryType().description = 'test';
        return schema;
    }
    /**
     * Create resources like files etc. for this plugin.
     * This method should write resouces to filesystem
     */
    createResources(metadata) {
        this.logError("");
        this.logWarning("High code coverage");
        this.generateCallback(metadata);
    }
    getPluginName() {
        return "test";
    }
}
const context = {
    model: undefined
};
test('Test plugin engine', async () => {
    const crudMethods = {
        "create": true,
        "update": true,
        "findOne": true,
        "find": true,
        "delete": true,
    };
    let engine = new GraphbackPluginEngine({ schema: schemaText });
    engine = new GraphbackPluginEngine({ schema: buildSchema(schemaText), config: { crudMethods } });
    expect.assertions(6);
    expect(engine.createResources).toThrow();
    const plugin = new TestPlugin((callbackModel) => {
        //eslint-disable-next-line dot-notation
        context['model'] = callbackModel;
        expect(callbackModel).toBeTruthy();
    });
    engine.registerPlugin(plugin, plugin, plugin);
    const model = engine.createResources();
    const printedModels = model.getModelDefinitions().map((element) => print(element.graphqlType.astNode));
    expect(printedModels).toMatchSnapshot();
    expect(model.getSchema().getQueryType().description === 'test').toBe(true);
});
//# sourceMappingURL=Engine.test.js.map