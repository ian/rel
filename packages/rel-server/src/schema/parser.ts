import { visit, print } from "graphql"
import { Fields, Relations } from "../types"

type ParsedObject = {
  name: string
  fields: Fields
  relations: Relations
}

export function parseObject(definition): ParsedObject {
  const name = definition.name.value
  const fields = {}
  const relations = {}

  visit(definition, {
    FieldDefinition(node) {
      const directives = parseDirectives(node.directives)
      const relationDirective = directives.find((d) => d.name === "rel")
      const restDirectives = directives.find((d) => d.name !== "rel")

      const name = node.name.value
      const value = [print(node.type)]
      const isRelation = !!relationDirective

      if (isRelation) {
        relations[name] = {
          name,
          type: value.join(" "),
          relation: {
            ...relationDirective.args,
            type: value.join(" ").replace(/[^\w]/g, ""),
          },
          directives: restDirectives,
        }
      } else {
        fields[name] = {
          name,
          type: value.join(" "),
          directives: restDirectives,
        }
      }
    },
  })

  return {
    name,
    fields,
    relations,
  }
}

export function parseDirectives(directives) {
  return directives.map((d) => {
    const args = d.arguments.reduce((acc, dir) => {
      acc[dir.name.value] = dir.value.value
      return acc
    }, {})

    return {
      name: d.name.value,
      args,
    }
  })
}
