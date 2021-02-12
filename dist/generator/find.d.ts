import { Fields } from "./fields";
declare type ResolverFindQueryOpts = {
    findBy?: string[];
    where?: string;
    only?: string[];
};
export declare function convertToResoverFindQuery(name: string, opts?: boolean | ResolverFindQueryOpts): {
    name: string;
    handler: (_: any, params: any) => Promise<any>;
};
export declare function convertToSchemaFindQuery(label: any, def: any, fields: Fields): {
    name: string;
    definition: string;
};
export {};
