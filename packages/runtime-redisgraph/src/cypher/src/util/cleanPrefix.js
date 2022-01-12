export default (obj, prefix) => {
  if (Array.isArray(obj) || (typeof obj === 'object' && obj !== null)) {
    const cleanKeys = _obj => {
      if (typeof _obj === 'object' && _obj !== null) {
        const newObj = {}
        Object.keys(_obj).forEach(key => {
          const cleanedKey = key.replace(prefix, '').replace(/\([a-zA-Z0-9]+\)/, '')
          newObj[cleanedKey] = _obj[key]
        })
        return newObj
      } else {
        return _obj
      }
    }
    if (Array.isArray(obj)) {
      const result = []
      for (let i = 0; i < obj.length; i++) {
        result.push(cleanKeys(obj[i]))
      }
      return result
    } else {
      return cleanKeys(obj)
    }
  } else {
    return obj
  }
}
