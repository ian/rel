import { SchemaCRUDPluginConfig } from '@graphback/codegen-schema';
import { GraphbackCRUDGeneratorConfig } from '@graphback/core';
/**
 * Global configuration for Graphback ecosystem that represents each plugin
 */
export interface GraphbackConfig {
    crud?: GraphbackCRUDGeneratorConfig;
    plugins?: {
        SchemaCRUD?: SchemaCRUDPluginConfig;
    } | any;
}
//# sourceMappingURL=GraphbackConfig.d.ts.map