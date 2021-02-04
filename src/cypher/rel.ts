export type CypherRelOpts = {
  name: string
  direction?: string
  label: string
}

export function cypherRel(rel: CypherRelOpts | string) {
  // if (typeof rel === "string") return `-[:${rel}]-`
  const { name, direction, label } = <CypherRelOpts>rel
  switch (direction) {
    case "inbound":
      return `<-[${name}:${label}]-`
    case "outbound":
      return `-[${name}:${label}]->`
    default:
      return `-[${name}:${label}]-`
  }
}
