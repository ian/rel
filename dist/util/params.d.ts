export declare enum TIMESTAMPS {
    CREATED = "createdAt",
    UPDATED = "updatedAt"
}
declare type ParamsBuilderOpts = {
    id?: boolean;
    timestamps?: boolean | TIMESTAMPS;
    only?: [string];
    except?: [string];
};
export declare function paramsBuilder(params: any, opts?: ParamsBuilderOpts): {};
declare type ToCypherOpts = {
    prefix?: string;
    separator?: string;
};
export declare function paramsToCypher(params: any, opts?: ToCypherOpts): string;
declare type ParamifyOpts = ParamsBuilderOpts & ToCypherOpts;
export declare function paramify(params: any, opts?: ParamifyOpts): string;
export {};
