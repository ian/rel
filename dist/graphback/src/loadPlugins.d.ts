import { GraphbackPlugin } from "@graphback/core";
interface PluginDefaultProps {
    packageName?: string;
}
interface PluginConfigMap {
    [pluginName: string]: PluginConfig;
}
interface PluginConfig extends PluginDefaultProps {
    [key: string]: any;
}
export declare function loadPlugins(pluginConfigMap: PluginConfigMap): GraphbackPlugin[];
export {};
//# sourceMappingURL=loadPlugins.d.ts.map