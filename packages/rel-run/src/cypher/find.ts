import { paramify } from "./util/params"

export async function cypherFind(label, params) {
  return this.exec1(
    `MATCH (n:${label} { ${paramify(params)} }) RETURN n;`
  ).then((res) => res?.n || null)
}
