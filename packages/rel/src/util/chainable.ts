export type ChainableObject = {
  [method: string]: (...args: any[]) => ChainableObject
}

export function chainable(
  // I hate TS sometimes, it's such a nightmare to define a constructable type
  constructor: any,
  methods: string[]
): ChainableObject {
  const chain = new (function () {
    this.props = {}

    methods.forEach((m) => {
      this[m] = (...args) => {
        const val = args.length > 1 ? args : args[0]
        Object.assign(this.props, {
          [m]: val,
        })
        return this
      }

      this.done = () => {
        return new constructor(this.props)
      }
    })
  })()

  return chain
}
