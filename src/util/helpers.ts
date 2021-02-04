export function objectId(objOrId) {
  if (typeof objOrId === "string") return objOrId
  return objOrId.id
}
