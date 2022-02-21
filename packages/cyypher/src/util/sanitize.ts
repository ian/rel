export function sanitize (maybeObject) {
  switch (true) {
    case maybeObject === undefined:
      return null
    // case isInt(maybeObject):
    //   return parseInt(maybeObject.toString())
    case typeof maybeObject === 'object':
      if (maybeObject.latitude && maybeObject.latitude) {
        return {
          lat: maybeObject.latitude,
          lng: maybeObject.longitude
        }
      }
      return Object.keys(maybeObject).reduce((acc, key) => {
        acc[key] = sanitize(maybeObject[key])
        return acc
      }, {})
    default:
      return maybeObject
  }
}
