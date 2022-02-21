import { paramify } from "../util/params.js"

function normalizeRel(rel) {
  if (typeof rel === "string") {
    return {
      __typename: rel,
    }
  } else {
    return rel
  }
}

export function cypherRel(name, rel) {
  const { __typename, __direction, ...values } = normalizeRel(rel)
  const inner = [`${name}:${__typename}`]
  if (values) inner.push(`{ ${paramify(values)} }`)

  switch (__direction) {
    case "IN":
      return `<-[${inner.join(" ")}]-`
    case "NONE":
      return `-[${inner.join(" ")}]-`
    case "OUT":
    default:
      return `-[${inner.join(" ")}]->`
  }
}
