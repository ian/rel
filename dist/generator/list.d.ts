import { Fields } from "./fields";
declare type ResolverListQueryOpts = {
    find?: string[];
    where?: string;
    only?: string[];
    search?: string[];
};
export declare function convertToSchemaListQuery(label: any, def: any, fields: Fields): {
    name: string;
    definition: string;
};
export declare function convertToResoverListQuery(label: string, opts?: boolean | ResolverListQueryOpts): {
    name: string;
    handler: (obj: any, params: any, context: any) => Promise<any[]>;
};
export {};
