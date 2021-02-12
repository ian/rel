export declare function geoify(addy: any): Promise<{
    address: string;
    geo: import("../ext/google").Geo;
}>;
export { Geo } from "../ext/google";
