export function buildResolver(resolver) {
  return async (obj, params, context) => {
    // @todo - send through cypher helper, fields, etc.

    return resolver({
      obj,
      params,
      context,
    })
  }
}
