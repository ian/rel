"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientDocumentsGQL = exports.createQueries = exports.createFragments = exports.subscription = exports.deleteMutation = exports.updateMutation = exports.createMutation = exports.findQuery = exports.findOneQuery = exports.expandedFragment = exports.fragment = void 0;
const core_1 = require("@graphback/core");
const fragmentFields_1 = require("./fragmentFields");
const fragment = (t) => {
    const queryReturnFields = fragmentFields_1.buildReturnFields(t, 0);
    const returnFieldsString = fragmentFields_1.printReturnFields(queryReturnFields);
    return `fragment ${t.name}Fields on ${t.name} {
${returnFieldsString}
}`;
};
exports.fragment = fragment;
const expandedFragment = (t) => {
    const queryReturnFields = fragmentFields_1.buildReturnFields(t, 1);
    const returnFieldsString = fragmentFields_1.printReturnFields(queryReturnFields);
    return `fragment ${t.name}ExpandedFields on ${t.name} {
${returnFieldsString}
}`;
};
exports.expandedFragment = expandedFragment;
const findOneQuery = (t) => {
    const fieldName = core_1.getFieldName(t.graphqlType.name, core_1.GraphbackOperationType.FIND_ONE);
    return `query ${fieldName}($id: ${t.primaryKey.type}!) {
    ${fieldName}(id: $id) {
      ...${t.graphqlType.name}ExpandedFields
    }
}`;
};
exports.findOneQuery = findOneQuery;
const findQuery = (t) => {
    const fieldName = core_1.getFieldName(t.name, core_1.GraphbackOperationType.FIND);
    const inputTypeField = core_1.getInputTypeName(t.name, core_1.GraphbackOperationType.FIND);
    return `query ${fieldName}($filter: ${inputTypeField}, $page: PageRequest, $orderBy: OrderByInput) {
    ${fieldName}(filter: $filter, page: $page, orderBy: $orderBy) {
      items {
        ...${t.name}ExpandedFields
      }
      offset
      limit
      count
    }
}`;
};
exports.findQuery = findQuery;
const createMutation = (t) => {
    const fieldName = core_1.getFieldName(t.name, core_1.GraphbackOperationType.CREATE);
    const inputTypeField = core_1.getInputTypeName(t.name, core_1.GraphbackOperationType.CREATE);
    return `mutation ${fieldName}($input: ${inputTypeField}!) {
  ${fieldName}(input: $input) {
      ...${t.name}Fields
  }
}`;
};
exports.createMutation = createMutation;
const updateMutation = (t) => {
    const fieldName = core_1.getFieldName(t.name, core_1.GraphbackOperationType.UPDATE);
    const inputTypeField = core_1.getInputTypeName(t.name, core_1.GraphbackOperationType.UPDATE);
    return `mutation ${fieldName}($input: ${inputTypeField}!) {
  ${fieldName}(input: $input) {
      ...${t.name}Fields
  }
}`;
};
exports.updateMutation = updateMutation;
const deleteMutation = (t) => {
    const fieldName = core_1.getFieldName(t.name, core_1.GraphbackOperationType.DELETE);
    const inputTypeField = core_1.getInputTypeName(t.name, core_1.GraphbackOperationType.DELETE);
    return `mutation ${fieldName}($input: ${inputTypeField}!) {
  ${fieldName}(input: $input) {
      ...${t.name}Fields
  }
}`;
};
exports.deleteMutation = deleteMutation;
const subscription = (t, fieldName, inputTypeField) => {
    return `subscription ${fieldName}($filter: ${inputTypeField}) {
  ${fieldName}(filter: $filter) {
      ...${t.name}Fields
  }
}`;
};
exports.subscription = subscription;
const createFragments = (types) => {
    return types.reduce((data, model) => {
        data.push({
            name: model.graphqlType.name,
            implementation: exports.fragment(model.graphqlType)
        });
        data.push({
            name: `${model.graphqlType.name}Expanded`,
            implementation: exports.expandedFragment(model.graphqlType)
        });
        return data;
    }, []);
};
exports.createFragments = createFragments;
const createQueries = (types) => {
    const queries = [];
    types.forEach((t) => {
        if (t.crudOptions.find) {
            queries.push({
                name: core_1.getFieldName(t.graphqlType.name, core_1.GraphbackOperationType.FIND),
                implementation: exports.findQuery(t.graphqlType)
            });
        }
        if (t.crudOptions.findOne) {
            queries.push({
                name: core_1.getFieldName(t.graphqlType.name, core_1.GraphbackOperationType.FIND_ONE),
                implementation: exports.findOneQuery(t)
            });
        }
    });
    return queries;
};
exports.createQueries = createQueries;
const createMutations = (types) => {
    const mutations = [];
    types.forEach((t) => {
        if (t.crudOptions.create) {
            mutations.push({
                name: core_1.getFieldName(t.graphqlType.name, core_1.GraphbackOperationType.CREATE),
                implementation: exports.createMutation(t.graphqlType)
            });
        }
        if (t.crudOptions.update) {
            mutations.push({
                name: core_1.getFieldName(t.graphqlType.name, core_1.GraphbackOperationType.UPDATE),
                implementation: exports.updateMutation(t.graphqlType)
            });
        }
        if (t.crudOptions.delete) {
            mutations.push({
                name: core_1.getFieldName(t.graphqlType.name, core_1.GraphbackOperationType.DELETE),
                implementation: exports.deleteMutation(t.graphqlType)
            });
        }
    });
    return mutations;
};
const createSubscriptions = (types) => {
    const subscriptions = [];
    types.forEach((t) => {
        const name = t.graphqlType.name;
        if (t.crudOptions.subCreate) {
            const operation = core_1.getSubscriptionName(name, core_1.GraphbackOperationType.CREATE);
            const inputTypeField = core_1.getInputTypeName(t.graphqlType.name, core_1.GraphbackOperationType.SUBSCRIPTION_CREATE);
            subscriptions.push({
                name: operation,
                implementation: exports.subscription(t.graphqlType, operation, inputTypeField)
            });
        }
        if (t.crudOptions.subUpdate) {
            const operation = core_1.getSubscriptionName(name, core_1.GraphbackOperationType.UPDATE);
            const inputTypeField = core_1.getInputTypeName(t.graphqlType.name, core_1.GraphbackOperationType.SUBSCRIPTION_UPDATE);
            subscriptions.push({
                name: operation,
                implementation: exports.subscription(t.graphqlType, operation, inputTypeField)
            });
        }
        if (t.crudOptions.subDelete) {
            const operation = core_1.getSubscriptionName(name, core_1.GraphbackOperationType.DELETE);
            const inputTypeField = core_1.getInputTypeName(t.graphqlType.name, core_1.GraphbackOperationType.SUBSCRIPTION_DELETE);
            subscriptions.push({
                name: operation,
                implementation: exports.subscription(t.graphqlType, operation, inputTypeField)
            });
        }
    });
    return subscriptions;
};
const createClientDocumentsGQL = (inputContext) => {
    return {
        fragments: exports.createFragments(inputContext),
        queries: exports.createQueries(inputContext),
        mutations: createMutations(inputContext),
        subscriptions: createSubscriptions(inputContext)
    };
};
exports.createClientDocumentsGQL = createClientDocumentsGQL;
//# sourceMappingURL=gqlTemplates.js.map