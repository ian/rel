"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientDocumentsTS = exports.createSubscriptionsTS = exports.createMutationsTS = exports.createQueriesTS = exports.createFragmentsTS = void 0;
const core_1 = require("@graphback/core");
const gqlTemplates_1 = require("./gqlTemplates");
const findOneQueryTS = (t) => {
    const fieldName = core_1.getFieldName(t.graphqlType.name, core_1.GraphbackOperationType.FIND_ONE);
    return `export const ${fieldName} = gql\`
  ${gqlTemplates_1.findOneQuery(t)}

  \$\{${t.graphqlType.name}ExpandedFragment}
\`
`;
};
const findQueryTS = (t) => {
    const fieldName = core_1.getFieldName(t.name, core_1.GraphbackOperationType.FIND);
    return `export const ${fieldName} = gql\`
  ${gqlTemplates_1.findQuery(t)}

  \$\{${t.name}ExpandedFragment}
\`
`;
};
const createMutationTS = (t) => {
    const fieldName = core_1.getFieldName(t.name, core_1.GraphbackOperationType.CREATE);
    return `export const ${fieldName} = gql\`
  ${gqlTemplates_1.createMutation(t)}

  \$\{${t.name}Fragment}
\`
`;
};
const updateMutationTS = (t) => {
    const fieldName = core_1.getFieldName(t.name, core_1.GraphbackOperationType.UPDATE);
    return `export const ${fieldName} = gql\`
  ${gqlTemplates_1.updateMutation(t)}

  \$\{${t.name}Fragment}
\`
`;
};
const deleteMutationTS = (t) => {
    const fieldName = core_1.getFieldName(t.name, core_1.GraphbackOperationType.DELETE);
    return `export const ${fieldName} = gql\`
  ${gqlTemplates_1.deleteMutation(t)}

  \$\{${t.name}Fragment}
\`
`;
};
const subscriptionTS = (t, subscriptionName, inputField) => {
    return `export const ${subscriptionName} = gql\`
  ${gqlTemplates_1.subscription(t, subscriptionName, inputField)}

  \$\{${t.name}Fragment}
\`
`;
};
const fragmentTS = (t) => {
    return `export const ${t.name}Fragment = gql\`
  ${gqlTemplates_1.fragment(t)}
\`
`;
};
const expandedFragmentTs = (t) => {
    return `export const ${t.name}ExpandedFragment = gql\`
  ${gqlTemplates_1.expandedFragment(t)}
\`
`;
};
const createFragmentsTS = (types) => {
    return types.reduce((data, model, currentIndex) => {
        const gqlImport = (currentIndex === 0) ? `import gql from "graphql-tag"` : '';
        data.push({
            name: model.graphqlType.name,
            implementation: `${gqlImport}\n\n${fragmentTS(model.graphqlType)}`,
        });
        data.push({
            name: `${model.graphqlType.name}Expanded`,
            implementation: expandedFragmentTs(model.graphqlType)
        });
        return data;
    }, []);
};
exports.createFragmentsTS = createFragmentsTS;
const createQueriesTS = (types) => {
    const queries = [];
    types.forEach((model) => {
        const t = model.graphqlType;
        if (model.crudOptions.find) {
            queries.push({
                name: core_1.getFieldName(t.name, core_1.GraphbackOperationType.FIND),
                implementation: findQueryTS(t)
            });
        }
        if (model.crudOptions.findOne) {
            queries.push({
                name: core_1.getFieldName(t.name, core_1.GraphbackOperationType.FIND_ONE),
                implementation: findOneQueryTS(model)
            });
        }
    });
    return queries;
};
exports.createQueriesTS = createQueriesTS;
const createMutationsTS = (types) => {
    const mutations = [];
    types.forEach((model) => {
        const t = model.graphqlType;
        if (model.crudOptions.create) {
            mutations.push({
                name: core_1.getFieldName(t.name, core_1.GraphbackOperationType.CREATE),
                implementation: createMutationTS(t)
            });
        }
        if (model.crudOptions.update) {
            mutations.push({
                name: core_1.getFieldName(t.name, core_1.GraphbackOperationType.UPDATE),
                implementation: updateMutationTS(t)
            });
        }
        if (model.crudOptions.delete) {
            mutations.push({
                name: core_1.getFieldName(t.name, core_1.GraphbackOperationType.DELETE),
                implementation: deleteMutationTS(t)
            });
        }
    });
    return mutations;
};
exports.createMutationsTS = createMutationsTS;
const createSubscriptionsTS = (types) => {
    const subscriptions = [];
    types.forEach((model) => {
        const t = model.graphqlType;
        const name = model.graphqlType.name;
        if (model.crudOptions.subCreate) {
            const operation = core_1.getSubscriptionName(name, core_1.GraphbackOperationType.CREATE);
            const inputTypeField = core_1.getInputTypeName(model.graphqlType.name, core_1.GraphbackOperationType.SUBSCRIPTION_CREATE);
            subscriptions.push({
                name: operation,
                implementation: subscriptionTS(t, operation, inputTypeField)
            });
        }
        if (model.crudOptions.subUpdate) {
            const operation = core_1.getSubscriptionName(name, core_1.GraphbackOperationType.UPDATE);
            const inputTypeField = core_1.getInputTypeName(model.graphqlType.name, core_1.GraphbackOperationType.SUBSCRIPTION_UPDATE);
            subscriptions.push({
                name: operation,
                implementation: subscriptionTS(t, operation, inputTypeField)
            });
        }
        if (model.crudOptions.subDelete) {
            const operation = core_1.getSubscriptionName(name, core_1.GraphbackOperationType.DELETE);
            const inputTypeField = core_1.getInputTypeName(model.graphqlType.name, core_1.GraphbackOperationType.SUBSCRIPTION_DELETE);
            subscriptions.push({
                name: operation,
                implementation: subscriptionTS(t, operation, inputTypeField)
            });
        }
    });
    return subscriptions;
};
exports.createSubscriptionsTS = createSubscriptionsTS;
const createClientDocumentsTS = (inputContext) => {
    return {
        fragments: exports.createFragmentsTS(inputContext),
        queries: exports.createQueriesTS(inputContext),
        mutations: exports.createMutationsTS(inputContext),
        subscriptions: exports.createSubscriptionsTS(inputContext)
    };
};
exports.createClientDocumentsTS = createClientDocumentsTS;
//# sourceMappingURL=tsTemplates.js.map