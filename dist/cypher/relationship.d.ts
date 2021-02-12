import { CypherNodeOpts } from "./node";
import { CypherRelOpts } from "./rel";
export declare type CypherRelationOpts = {
    from: CypherNodeOpts;
    to: CypherNodeOpts;
    rel: CypherRelOpts;
    where?: string;
    order?: string;
    singular?: boolean;
};
export declare function cypherListRelationship(opts: CypherRelationOpts): string;
export declare type AddAssociationOpts = {
    singular?: boolean;
};
export declare function cypherAddAssociation(from: CypherNodeOpts, to: CypherNodeOpts, rel: CypherRelOpts, opts?: AddAssociationOpts): string;
export declare type RemoveAssociationOpts = {
    singular?: boolean;
};
export declare function cypherRemoveAssociation(from: object | string, to: object | string, relLabel: string, relValues?: {}): Promise<void>;
