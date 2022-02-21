import { coerce } from './coercion.js'

type ParmsBuilderOpts = {
  except?: any
  only?: any
}

export function paramsBuilder(params, opts: ParmsBuilderOpts = {}) {
  const { except = null, only = null } = opts

  const res = {}

  // Prune out if requested
  let fieldKeys = Object.keys(params)
  if (only) fieldKeys = fieldKeys.filter((k) => only.includes(k))
  else if (except) fieldKeys = fieldKeys.filter((k) => !except.includes(k))

  for (const key of fieldKeys) {
    res[key] = params[key]
  }

  return res
}

type ParamsToCypherOpts = {
  separator?: string
  join?: string
  prefix?: string
}

export function paramsToCypher(params, opts: ParamsToCypherOpts = {}) {
  const { separator = ':', join = ' , ', prefix = null } = opts

  function mapper(key) {
    const field = prefix ? `${prefix}${key}` : key
    const value = coerce(this[key])
    return `${field} ${separator} ${value}`
  }

  return Object.keys(params).map(mapper, params).join(join)
}

// Converts { id: "1", name: "Ian" } => `id: 1, name: "Ian"`
export function paramify(params, opts = {}) {
  return paramsToCypher(paramsBuilder(params, opts), opts)
}

// Converts { id: "1", name: "Ian" } => `id = 1 AND name = "Ian"`
export function andify(params, opts = {}) {
  return paramsToCypher(paramsBuilder(params, opts), {
    separator: '=',
    join: ' AND ',
    ...opts,
  })
  // return paramsToCypher(params, { separator: '=', join: ' AND ', ...opts })
}

// Converts { id: "1", name: "Ian" } => `SET id = 1, SET name = "Ian"`
export function setify(params, opts = {}) {
  return paramsToCypher(paramsBuilder(params, opts), {
    separator: '=',
    join: ', ',
    ...opts,
  })
  // return paramsToCypher(params, { separator: '=', join: ', ', ...opts })
}
