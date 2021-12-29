const operators = ['eq', 'ne', 'lt', 'le', 'ge', 'gt', 'contains', 'startsWith', 'endsWith', 'in', 'between', 'nbetween']

const mapQueryFilterOperatorToWhereCondition = (operator, value) => {
  const operatorToWhereConditionMap = {
    eq: [value === null ? 'IS' : '=', typeof value === 'string' ? `'${value}'` : value],
    ne: [value === null ? 'IS NOT' : '<>', typeof value === 'string' ? `'${value}'` : value],
    lt: ['<', typeof value === 'string' ? `'${value}'` : value],
    le: ['<=', typeof value === 'string' ? `'${value}'` : value],
    ge: ['>=', typeof value === 'string' ? `'${value}'` : value],
    gt: ['>', typeof value === 'string' ? `'${value}'` : value],
    contains: ['CONTAINS', `'${value}'`],
    startsWith: ['STARTS WITH', `'${value}'`],
    endsWith: ['ENDS WITH', `'${value}'`],
    in: ['IN', Array.isArray(value) ? value.reduce((previous, current, idx, arr) => previous + `${current}${idx === arr.length - 1 ? ']' : ','}`, '[') : '()'],
    between: ['IN RANGE', Array.isArray(value) ? value.reduce((previous, current, idx, arr) => previous + `${current}${idx === arr.length - 1 ? ')' : ','}`, '(') : '()']
  }
  return operatorToWhereConditionMap[operator]
}

function isPrimitive (test) {
  return ((test instanceof RegExp) || (test !== Object(test)))
};

export function buildQuery (filter) {
  if (filter === undefined) { return undefined }

  if (Array.isArray(filter)) {
    return filter.map(buildQuery)
  } else if (!isPrimitive(filter)) {
    return Object.keys(filter).reduce((obj, key) => {
      let propVal
      if (operators.includes(key)) {
        propVal = mapQueryFilterOperatorToWhereCondition(key, filter[key])
      } else {
        propVal = buildQuery(filter[key])
      }
      obj[key] = propVal
      return obj
    }, {})
  }

  return filter
}
