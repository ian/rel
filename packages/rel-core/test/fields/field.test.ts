import Field from "../../src/property/fields/field"

class MyField extends Field {
  constructor() {
    super("MyField")
  }
}

const subject = () => {
  return new MyField()
}

describe("functions", () => {
  it("should define required", () => {
    expect(subject().required).toBeDefined()
  })

  it("should define guard", () => {
    expect(subject().guard).toBeDefined()
  })
})

describe("defaults", () => {
  const s = subject()
  expect(s._name).toBe("MyField")
  expect(s._required).toBe(false)
  expect(s._guard).toBe(null)
})

describe("required", () => {
  it("should set required", () => {
    const field = new MyField().required()
    expect(field._required).toBe(true)
  })

  it("should allow an optional param to required", () => {
    const field = new MyField()
    expect(field.required(true)._required).toBe(true)
    expect(field.required(false)._required).toBe(false)
  })
})

describe("guard", () => {
  it("should set the guard", () => {
    const field = new MyField()
    field.guard("admin")
    expect(field._guard).toBe("admin")
  })
})

describe("default", () => {
  it("should set the default", () => {
    const field = new MyField()
    field.default(() => "foo")
    expect(field._default({})).toBe("foo")
  })
})

describe("resolver", () => {
  it("should set the resolver", () => {
    const field = new MyField()
    field.resolver(() => {
      return "RESOLVER"
    })
    expect(field._resolver()).toBe("RESOLVER")
  })
})

describe("toGQL", () => {
  it("should output the base type", () => {
    expect(subject().toGQL()).toBe("MyField")
  })

  it("should add the ! when required", () => {
    expect(subject().required().toGQL()).toBe("MyField!")
  })

  it("should add the guard as @guard", () => {
    expect(subject().guard("admin").toGQL()).toBe("MyField @admin")
  })
})
