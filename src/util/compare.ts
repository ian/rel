/*!
 * Find the differences between two objects and push to a new object
 * (c) 2019 Chris Ferdinandi & Jascha Brinkmann, MIT License, https://gomakethings.com & https://twitter.com/jaschaio
 * @param  {Object} obj1 The original object
 * @param  {Object} obj2 The object to compare against it
 * @return {Object}      An object of differences between the two
 */

type Opts = {
  ignore?: string[]
}

export const diff = function (obj1, obj2, opts: Opts = {}) {
  const { ignore = [] } = opts
  const changed = {}

  if (!obj2) return changed
  if (typeof obj1 !== "object" || typeof obj2 !== "object")
    throw new Error("diff can only be used on two objects")

  Object.entries(obj2).forEach(([k, v]) => {
    if (obj1[k] != obj2[k] && !ignore.includes(k)) {
      changed[k] = v
    }
  })

  return changed
}
