import { ModelProperties, ModelOptions } from "../types"
import { Hydrator } from "../server"
import Rel from "../meta"
import ModelImpl from "./model"

class Tree extends ModelImpl {
  hydrate(hydrator: Hydrator) {
    super.hydrate(hydrator)

    hydrator.schema(
      Rel.model(this.name, {
        parent: Rel.relation("CHILD")
          .to(this.name)
          .singular()
          .inbound()
          .endpoints({
            add: {
              name: "CategorySetParent",
              fromParam: "childId",
              toParam: "parentId",
            },
            remove: {
              name: "CategoryUnsetParent",
              fromParam: "childId",
              toParam: "parentId",
            },
          }),
        children: Rel.relation("CHILD")
          .to(this.name)
          .endpoints({
            add: {
              name: "CategoryAddChild",
              fromParam: "parentId",
              toParam: "childId",
            },
            remove: {
              name: "CategoryRemoveChild",
              fromParam: "parentId",
              toParam: "childId",
            },
          }),
      })
    )

    hydrator.endpoints(
      Rel.query(
        "TopLevelCategories",
        Rel.array(Rel.ref(this.name)).required(),
        async (runtime) => {
          const { cypher } = runtime
          // would be nice to do this:
          // cypher.list(this.name, {
          //   match: `(parent:${this.name})`
          //   where: [`NOT (parent)<-[:CHILD]-(:${this.name})`]
          //   return: "parent"
          // })
          return cypher
            .exec(
              `MATCH (parent:${this.name}) WHERE NOT (parent)<-[:CHILD]-(:${this.name}) RETURN parent;`
            )
            .then((res) => res.map((node) => node.c))
        }
      )
    )
  }
}

export default (
  name: string,
  props: ModelProperties,
  opts: ModelOptions = {}
) => {
  return new Tree(name, props, opts)
}
