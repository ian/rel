export function buildResolver(handler) {
  return async (obj, params, context) => {
    // @todo - send through cypher helper, fields, etc.

    return handler({
      obj,
      params,
      context,
    })
  }
}
