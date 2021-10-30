import moment from 'moment'
import { v4 as uuid } from 'uuid'
import { coerce } from './coercion'

export enum TIMESTAMPS {
  CREATED = 'createdAt',
  UPDATED = 'updatedAt',
}

type Opts = {
  id?: boolean
  timestamps?: boolean | TIMESTAMPS
  only?: [string]
  except?: [string]
}

type Params = {
  id?: string
  createdAt?: string
  updatedAt?: string
}

type ToCypherOpts = {
  prefix?: string
  separator?: string
  join?: string
}

type ParamifyOpts = Opts & ToCypherOpts

export function paramsBuilder(params, opts: Opts = {}): Params {
  const { id = false, timestamps = false, except = null, only = null } = opts

  let res = {}

  // Prune out if requested
  let fieldKeys = Object.keys(params)
  if (only) fieldKeys = fieldKeys.filter((k) => only.includes(k))
  else if (except) fieldKeys = fieldKeys.filter((k) => !except.includes(k))

  for (let key of fieldKeys) {
    res[key] = params[key]
  }

  if (id) res['id'] = uuid()

  if (timestamps) {
    if (timestamps === TIMESTAMPS.CREATED || timestamps === true) {
      res['createdAt'] = moment().toISOString()
    }

    if (timestamps === TIMESTAMPS.UPDATED || timestamps === true) {
      res['updatedAt'] = moment().toISOString()
    }
  }

  return res
}

export function paramsToCypher(params, opts: ToCypherOpts = {}) {
  const { separator = ':', join = ' , ', prefix = null } = opts

  function mapper(key) {
    const field = prefix ? `${prefix}${key}` : key
    const value = coerce(this[key])
    return `${field} ${separator} ${value}`
  }

  return Object.keys(params).map(mapper, params).join(join)
}

// Converts { id: "1", name: "Ian" } => `id: 1, name: "Ian"`
export function paramify(params, opts: ParamifyOpts = {}) {
  return paramsToCypher(paramsBuilder(params, opts), opts)
}

// Converts { id: "1", name: "Ian" } => `id = 1 AND name = "Ian"`
export function andify(params, opts: ParamifyOpts = {}) {
  return paramsToCypher(paramsBuilder(params, opts), {
    separator: '=',
    join: ' AND ',
    ...opts,
  })
  // return paramsToCypher(params, { separator: '=', join: ' AND ', ...opts })
}

// Converts { id: "1", name: "Ian" } => `SET id = 1, SET name = "Ian"`
export function setify(params, opts: ParamifyOpts = {}) {
  return paramsToCypher(paramsBuilder(params, opts), {
    separator: '=',
    join: ', ',
    ...opts,
  })
  // return paramsToCypher(params, { separator: '=', join: ', ', ...opts })
}
