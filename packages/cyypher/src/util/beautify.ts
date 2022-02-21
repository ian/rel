export function beautifyCypher(query) {
  return query
    .split('\n')
    .map((s) => s.trim())
    .join('\n')
}
