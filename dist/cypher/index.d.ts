import { Result } from "neo4j-driver";
declare type Cypher1Response = {
    [key: string]: any;
};
declare type CypherResponse = Cypher1Response[];
export declare function cypherRaw(query: any): Promise<Result>;
export declare function cypher(query: any): Promise<CypherResponse>;
export declare function cypher1(query: any): Promise<Cypher1Response>;
export * from "./node";
export * from "./relationship";
