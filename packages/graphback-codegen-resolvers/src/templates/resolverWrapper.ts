import { GeneratorResolversFormat } from '../GeneratorResolversFormat';
import { ResolverGeneratorPluginConfig } from '../ResolverGeneratorPlugin';
import { formatDocumentJS, formatDocumentTs } from './formatter'
//Wraps resolver method strings into fully featured files

const topNote = `/*
* File generated by Graphback CRUD resolver plugin.
* Content will be overwritten by Graphback generator.
* To change implementation please disable generator options and supply your own implementation
* outside generated file.
 */`

export const resolverFileTemplateTS = (outputResolvers: string[], options: ResolverGeneratorPluginConfig) => {
    return `${topNote}\n\nexport default {
      ${outputResolvers.join('\n\n\t')}  
    }`
}

export const resolverFileTemplateJS = (outputResolvers: string[], options: ResolverGeneratorPluginConfig) => {
    return `${topNote}\n\n exports = {
      ${outputResolvers.join('\n\n')}  
    }`
}

const mapResolverKeyValueTemplates = (resolvers: any) => {
    const resolverNames = Object.keys(resolvers);

    return resolverNames.map((resolverName: string) => {
        const resolverFn = resolvers[resolverName];

        return `${resolverName}: ${resolverFn}`;
    });
}

function createResolverFileTemplate(outputResolvers: string[], options: ResolverGeneratorPluginConfig) {
    switch (options.format) {
        case 'js':
            return formatDocumentJS(resolverFileTemplateJS(outputResolvers, options));
        case 'ts':
            return formatDocumentTs(resolverFileTemplateTS(outputResolvers, options));
        default:
            throw new Error(`"${options.format}" resolvers are not supported`);
    }
}

export const createResolverTemplate = (typeResolvers: GeneratorResolversFormat, options: ResolverGeneratorPluginConfig) => {
    const mutations = mapResolverKeyValueTemplates(typeResolvers.Mutation)
    delete typeResolvers.Mutation;

    const queries = mapResolverKeyValueTemplates(typeResolvers.Query);
    delete typeResolvers.Query;

    const subscriptions = mapResolverKeyValueTemplates(typeResolvers.Subscription);
    delete typeResolvers.Subscription;

    const outputResolvers: string[] = [];

    for (const [typeName, resolverObj] of Object.entries(typeResolvers)) {
        const relationResolvers = mapResolverKeyValueTemplates(resolverObj);
        outputResolvers.push(`${typeName}: {
            ${relationResolvers.join(',\n')}
        },`)
    }

    if (options.layout === "apollo") {
        if (queries.length) {
            outputResolvers.push(`Query: {
            ${queries.join(',\n')}
        },`)
        }
        if (mutations.length) {
            outputResolvers.push(`Mutation: {
            ${mutations.join(',\n')}
        },`)
        }
        if (subscriptions.length) {
            outputResolvers.push(`Subscription: {
            ${subscriptions.join(',\n')}
        }`)
        }
    } else if (options.layout === "graphql") {
        outputResolvers.push(`${queries.join(',\n')},`)
        outputResolvers.push(`${mutations.join(',\n')},`)
        outputResolvers.push(`${subscriptions.join(',\n')},`)
    } else {
        throw new Error("Wrong layout specified in resolver generator plugin")
    }

    return createResolverFileTemplate(outputResolvers, options);
}
