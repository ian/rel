import { ModelTableMap } from './buildModelTableMap';
export interface TableDataMap {
    idField?: TableID;
    table?: string;
    data?: any;
    fieldMap?: any;
}
export interface TableID {
    name: string;
    value?: any;
}
export declare const getDatabaseArguments: (modelMap: ModelTableMap, data?: any) => TableDataMap;
//# sourceMappingURL=dataMapper.d.ts.map