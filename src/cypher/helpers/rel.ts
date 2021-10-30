import { Rel, RelationDirection } from '../types'
import { paramify } from '../util/params'

function normalizeRel(rel: Rel | string): Rel {
  if (typeof rel === 'string') {
    return {
      __typename: rel,
    }
  } else {
    return rel
  }
}

export function cypherRel(name, rel: Rel | string) {
  const { __typename, __direction, ...values } = normalizeRel(rel)

  const inner = [`${name}:${__typename}`]
  if (values) inner.push(`{ ${paramify({ ...values, __typename })} }`)

  switch (__direction) {
    case RelationDirection.IN:
      return `<-[${inner.join(' ')}]-`
    case RelationDirection.NONE:
      return `-[${inner.join(' ')}]-`
    case RelationDirection.OUT:
    default:
      return `-[${inner.join(' ')}]->`
  }
}
