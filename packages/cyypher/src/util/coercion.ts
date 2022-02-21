import { Geo } from './geo.js'

export function coerce (val) {
  switch (true) {
    case val instanceof Geo:
      return `point({ latitude: ${val.lat}, longitude: ${val.lng} })`
    case typeof val === 'string':
      return `"${val.replace(/"/g, '\\"')}"`
    case val === null:
    case val === undefined:
      return 'null'
    case typeof val === 'object':
      return Object.keys(val).reduce((acc, key) => {
        acc[key] = coerce(val[key])
        return acc
      }, {})
    default:
      return val
  }
}
