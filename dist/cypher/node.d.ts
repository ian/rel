export declare type CypherNodeOpts = {
    name: string;
    params?: object;
    label?: string;
};
export declare function cypherNode(optsOrLabel: CypherNodeOpts): string;
