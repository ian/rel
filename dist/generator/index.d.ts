import { Fields } from "./fields";
declare type Accessors = {
    find?: boolean;
    list?: boolean;
};
export declare type Schema = {
    fields: Fields;
    accessors: Accessors;
};
export declare function generate(obj: any): {
    schema: string;
    resolvers: {
        Query: {};
        Mutation: {};
    };
};
export {};
