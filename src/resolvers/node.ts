import _ from "lodash"

// export type NodeOpts = {
//   label: string
//   params?: object
// }

function callIfFunction(objOrFunc, runtime) {
  if (typeof objOrFunc === "function") {
    return objOrFunc(runtime)
  } else {
    return objOrFunc
  }
}

function resolveParams(definition, runtime, defaults): object {
  if (!definition) return null

  if (definition.params) {
    return callIfFunction(definition.params, runtime)
  } else if (defaults?.params) {
    return callIfFunction(defaults.params, runtime)
  }

  return null
}

function resolveLabel(def): string {
  if (!def) return null
  if (typeof def === "string") {
    return def
  }
  return def.label
}

export function resolveNode(name, def, runtime, defaults = null) {
  return {
    name,
    label: resolveLabel(def),
    params: resolveParams(def, runtime, defaults),
  }
}
