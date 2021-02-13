export type ResolvableObject = {
  [key: string]: any
}

export type ResolvableParams = {
  [key: string]: any
}

export type RuntimeAuthUser = {
  id: string
  name: string
}

export type RuntimeContext = {
  authUser?: RuntimeAuthUser
}

export type RuntimeParams = [
  obj: ResolvableObject,
  params: ResolvableParams,
  context: RuntimeContext
]
