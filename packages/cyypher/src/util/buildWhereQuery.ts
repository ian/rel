import { coerce } from "./coercion"

const buildWhereQuery = (data = {}, opts = { prefix: "" }) => {
  let result = ""
  return Object.keys(data).reduce((querystring, key, idx, arr) => {
    if (["and", "or", "not"].includes(key.toLowerCase())) {
      result = querystring + (key.toLowerCase() === "not" ? "NOT" : "")
      if (Array.isArray(data[key])) {
        result += data[key].reduce((previous, current, idx, _arr) => {
          return (
            previous +
            buildWhereQuery(current, opts) +
            (idx === _arr.length - 1
              ? ")"
              : key.toLowerCase() === "AND"
              ? " AND "
              : " OR ")
          )
        }, "(")
      } else {
        result += "(" + buildWhereQuery(data[key], opts) + ")"
      }
    } else if (Array.isArray(data[key])) {
      result = querystring + data[key].join(" ")
    } else if (
      typeof data[key] === "object" &&
      Object.keys(data[key]).length > 0
    ) {
      result =
        querystring + opts.prefix + key + " " + buildWhereQuery(data[key], opts)
    } else {
      result = querystring + opts.prefix + key + " = " + coerce(data[key])
    }
    result += idx === arr.length - 1 ? "" : " AND "
    return result
  }, "")
}

export default buildWhereQuery
