import { HydrationOpts } from "../types"
import Model from "./model"

// To IH: If you switch this to using composer interface, you don't need this cludgy import flow
import Fields from "../fields"
import Objects from "../objects"
import Relations from "../relations"
import Endpoints from "../endpoints"

export default class Tree extends Model {
  hydrate(opts: HydrationOpts) {
    super.hydrate(opts)
    const { hydrator } = opts
    hydrator.schema(
      Objects.model(this.name, {
        parent: Relations.relation("CHILD")
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
        children: Relations.relation("CHILD")
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
      Endpoints.query(
        "TopLevelCategories",
        { order: Fields.string(), limit: Fields.int() },
        Fields.array(Fields.ref(this.name)).required(),
        async (obj, params, context) => {
          const { order = "id", limit } = params
          const { cypher } = context

          // would be nice to do this:
          // cypher.list(this.name, {
          //   match: `(parent:${this.name})`
          //   where: [`NOT (parent)<-[:CHILD]-(:${this.name})`]
          //   return: "parent"
          // })

          return cypher
            .exec(
              `
              MATCH (parent:${this.name})
              WHERE NOT (parent)<-[:CHILD]-(:${this.name})
              RETURN parent
              ${limit ? "LIMIT " + limit : ""}
              ORDER BY parent.${order}`
            )
            .then((res) => res.map((node) => node.parent))
        }
      )
    )
  }
}
