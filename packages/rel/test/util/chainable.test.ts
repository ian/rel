import { chainable } from "../../src/util/chainable"

describe("#chainable function constructors", () => {
  function thing(props: object) {
    this.props = props
  }

  it("should chain methods", () => {
    const chain = chainable(thing, ["first", "second"])
    chain.first("foo").second("bar")

    expect(chain.done().props).toEqual({
      first: "foo",
      second: "bar",
    })
  })
})

describe("#chainable classes", () => {
  class Thing {
    props

    constructor(props) {
      this.props = props
    }
  }

  it("should chain methods", () => {
    const chain = chainable(Thing, ["first", "second"])
    chain.first("foo").second("bar")

    expect(chain.done().props).toEqual({
      first: "foo",
      second: "bar",
    })
  })
})
