export declare type CypherRelOpts = {
    name: string;
    direction?: string;
    label: string;
};
export declare function cypherRel(rel: CypherRelOpts | string): string;
