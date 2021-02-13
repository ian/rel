// type GqlObject = {
type ResolvableObject = {
  [key: string]: any
}

type ResolvableParams = {
  [key: string]: any
}

type RuntimeAuthUser = {
  id: string
  name: string
}

type RuntimeContext = {
  authUser?: RuntimeAuthUser
}

export type RuntimeParams = {
  obj: ResolvableObject
  params: ResolvableParams
  context: RuntimeContext
}

export * from "./node"
export * from "./accessors"
export * from "./relations"
