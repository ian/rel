declare const client: any;
export declare class Geo {
    lat: number;
    lng: number;
    constructor({ lat, lng }: {
        lat: any;
        lng: any;
    });
}
declare type GeocodeResponse = {
    address: string;
    geo: Geo;
};
export declare function geocode(rawAddress: any, tries?: number): Promise<GeocodeResponse>;
export default client;
