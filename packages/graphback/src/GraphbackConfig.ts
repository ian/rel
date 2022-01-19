import { SchemaCRUDPluginConfig } from '@graphback/codegen-schema'

/**
 * Global configuration for Graphback ecosystem that represents each plugin
 */
export interface GraphbackConfig {
  plugins?: {
    SchemaCRUD?: SchemaCRUDPluginConfig
  } | any
}
