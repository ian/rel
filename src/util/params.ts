import moment from "moment"
import { v4 as uuid } from "uuid"
import { coerce } from "./coercion"

export enum TIMESTAMPS {
  CREATED = "createdAt",
  UPDATED = "updatedAt",
}

type ParamsBuilderOpts = {
  id?: boolean
  timestamps?: boolean | TIMESTAMPS
  only?: [string]
  except?: [string]
}

export function paramsBuilder(params, opts: ParamsBuilderOpts = {}) {
  const { id = false, timestamps = false, except = null, only = null } = opts

  let res = {}

  // Prune out if requested
  let fieldKeys = Object.keys(params)
  if (only) fieldKeys = fieldKeys.filter((k) => only.includes(k))
  else if (except) fieldKeys = fieldKeys.filter((k) => !except.includes(k))

  for (let key of fieldKeys) {
    res[key] = params[key]
  }

  if (id) res["id"] = uuid()

  if (timestamps) {
    if (timestamps === TIMESTAMPS.CREATED || timestamps === true) {
      res["createdAt"] = moment().toISOString()
    }

    if (timestamps === TIMESTAMPS.UPDATED || timestamps === true) {
      res["updatedAt"] = moment().toISOString()
    }
  }

  return res
}

type ToCypherOpts = {
  prefix?: string
  separator?: string
}

export function paramsToCypher(params, opts: ToCypherOpts = {}) {
  const { separator = ":", prefix = null } = opts

  function mapper(key) {
    const field = prefix ? `${prefix}${key}` : key
    const value = coerce(this[key])
    return `${field} ${separator} ${value}`
  }

  return Object.keys(params).map(mapper, params).join(" , ")
}

type ParamifyOpts = ParamsBuilderOpts & ToCypherOpts

export function paramify(params, opts: ParamifyOpts = {}) {
  return paramsToCypher(paramsBuilder(params, opts), opts)
}
