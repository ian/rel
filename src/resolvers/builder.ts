export function buildResolver(handler) {
  return async (obj, params, context) => {
    const sanitizedParams = JSON.parse(JSON.stringify(params))

    return handler({
      obj,
      params: sanitizedParams,
      context,
    })
  }
}
