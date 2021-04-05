import _ from "lodash"

export const clean = (obj) => {
  return _.pickBy(obj, function (value, key) {
    return !(value === undefined || value === null)
  })
}
