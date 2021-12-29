import { buildSchema } from "graphql";
import { GraphbackCoreMetadata } from "../src/plugin/GraphbackCoreMetadata";
import { getModelFieldsFromResolverFields } from '../src/plugin/getSelectedFieldsFromResolverInfo';
describe('getSelectedFieldsFromResolverInfo', () => {
    const setup = (schemaAST) => {
        const schema = buildSchema(schemaAST);
        const metadata = new GraphbackCoreMetadata({ crudMethods: {} }, schema);
        return { metadata, schema };
    };
    test('Ignore @transient annotated fields', () => {
        const { metadata } = setup(`
    """ @model """
type User {
  id: ID!
  forename: String
  surname: String
  """@transient"""
  fullName: String
}`);
        const userModel = metadata.getModelDefinitions().find((m) => m.graphqlType.name === 'User');
        const selectedFields = getModelFieldsFromResolverFields(['id', 'forename', 'surname', 'fullName'], userModel);
        expect(selectedFields).toEqual(['id', 'forename', 'surname']);
    });
});
//# sourceMappingURL=getSelectedFieldsFromResolverInfo.test.js.map