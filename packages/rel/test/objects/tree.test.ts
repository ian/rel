import Rel, { testServer } from "../../src"

describe("#tree", () => {
  describe("GQL", () => {
    const server = testServer({ log: false })
      .schema(
        Rel.tree("Category", {
          name: Rel.string(),
        })
      )
      .runtime()

    it("should set defaults id, createdAt, and updatedAt like a model", async () => {
      const { typeDefs } = server

      expect(typeDefs).toMatch(`input CategoryInput {
  name: String
}`)

      expect(typeDefs).toMatch(`type Category {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String
  parent: Category
  children: [Category]!
}`)

      expect(typeDefs).toMatch(
        `CategorySetParent(childId: UUID!, parentId: UUID!): Category`
      )
      expect(typeDefs).toMatch(`CategoryUnsetParent(childId: UUID!): Category`)
      expect(typeDefs).toMatch(
        `CategoryAddChild(childId: UUID!, parentId: UUID!): Category`
      )
      expect(typeDefs).toMatch(
        `CategoryRemoveChild(childId: UUID!, parentId: UUID!): Category`
      )
      expect(typeDefs).toMatch(
        `TopLevelCategories(limit: Int, order: String): [Category]!`
      )
    })
  })

  describe("Resolvers", () => {
    const server = testServer({ log: false })
      .schema(
        Rel.tree("Category", {
          name: Rel.string(),
        }).endpoints(true)
      )
      .runtime()
    const { cypher, graphql } = server
    let parent, child

    it("TopLevelCategories", async (done) => {
      await cypher.exec(`
        CREATE (parent1:Category { id: "p1" }), 
               (parent2:Category { id: "p2" }), 
               (child1:Category { id: "c1" }), 
               (child2:Category { id: "c2" }), 
               (child3:Category { id: "c3" }), 
               (child4:Category { id: "c4" })
        MERGE (parent1)-[:CHILD]->(child1)
        MERGE (parent1)-[:CHILD]->(child2)
        MERGE (parent2)-[:CHILD]->(child3)
        MERGE (parent2)-[:CHILD]->(child4)
        RETURN parent1, parent2, child1, child2, child3, child4;
      `)

      const topLevel = await graphql(
        `
          query {
            categories: TopLevelCategories(order: "id") {
              id
            }
          }
        `
      )

      expect(topLevel.errors).toBeUndefined()
      expect(topLevel.data.categories).toEqual([{ id: "p1" }, { id: "p2" }])

      done()
    })

    describe("adding", () => {
      beforeEach(async (done) => {
        const { data } = await graphql(`
          mutation Create {
            parent: CreateCategory(input: { name: "Parent" }) {
              id
              name
            }
            child: CreateCategory(input: { name: "Child" }) {
              id
              name
            }
          }
        `)

        parent = data.parent
        child = data.child

        done()
      })

      it("CategoryAddChild", async (done) => {
        const added = await graphql(
          `
            mutation Add($parentId: UUID!, $childId: UUID!) {
              category: CategoryAddChild(
                parentId: $parentId
                childId: $childId
              ) {
                id
                name
              }
            }
          `,
          {
            parentId: parent.id,
            childId: child.id,
          }
        )

        expect(added.errors).toBeUndefined()
        expect(added.data.category.id).toEqual(child.id)
        const { typeDefs } = server

        const { data, errors } = await graphql(
          `
            query List($id: UUID!) {
              category: FindCategory(where: { id: $id }) {
                id
                children {
                  id
                }
              }
            }
          `,
          {
            id: parent.id,
          }
        )

        expect(errors).toBeUndefined()
        expect(data?.category.id).toEqual(parent.id)
        expect(data?.category.children).toEqual([{ id: child.id }])

        done()
      })

      it("CategorySetParent", async (done) => {
        const set = await graphql(
          `
            mutation Set($parentId: UUID!, $childId: UUID!) {
              parent: CategorySetParent(
                parentId: $parentId
                childId: $childId
              ) {
                id
                name
              }
            }
          `,
          {
            parentId: parent.id,
            childId: child.id,
          }
        )

        expect(set.errors).toBeUndefined()
        expect(set.data.parent.id).toEqual(parent.id)

        const list = await graphql(
          `
            query List($id: UUID!) {
              category: FindCategory(where: { id: $id }) {
                id
                parent {
                  id
                }
              }
            }
          `,
          {
            id: child.id,
          }
        )

        expect(list.data.category.id).toEqual(child.id)
        expect(list.data.category.parent).toEqual({ id: parent.id })

        done()
      })
    })

    describe("removing", () => {
      beforeEach(async (done) => {
        const { data } = await graphql(`
          mutation Create {
            parent: CreateCategory(input: { name: "Parent" }) {
              id
              name
            }
            child: CreateCategory(input: { name: "Child" }) {
              id
              name
            }
          }
        `)

        parent = data.parent
        child = data.child

        done()
      })

      it("CategoryUnsetParent", async (done) => {
        const set = await graphql(
          `
            mutation Set($parentId: UUID!, $childId: UUID!) {
              parent: CategorySetParent(
                parentId: $parentId
                childId: $childId
              ) {
                id
                name
              }
            }
          `,
          {
            parentId: parent.id,
            childId: child.id,
          }
        )

        expect(set.errors).toBeUndefined()
        expect(set.data.parent.id).toEqual(parent.id)

        const list = await graphql(
          `
            query List($id: UUID!) {
              category: FindCategory(where: { id: $id }) {
                id
                parent {
                  id
                }
              }
            }
          `,
          {
            id: child.id,
          }
        )

        expect(list.errors).toBeUndefined()
        expect(list.data.category.id).toEqual(child.id)
        expect(list.data.category.parent).toEqual({ id: parent.id })

        const unset = await graphql(
          `
            mutation Unset($childId: UUID!) {
              parent: CategoryUnsetParent(childId: $childId) {
                id
                name
              }
            }
          `,
          {
            childId: child.id,
          }
        )

        expect(unset.errors).toBeUndefined()
        expect(unset.data.parent.id).toEqual(parent.id)

        const list2 = await graphql(
          `
            query List($id: UUID!) {
              category: FindCategory(where: { id: $id }) {
                id
                parent {
                  id
                }
              }
            }
          `,
          {
            id: child.id,
          }
        )

        expect(list2.errors).toBeUndefined()
        expect(list2.data.category.id).toEqual(child.id)
        expect(list2.data.category.parent).toEqual(null)

        done()
      })

      it("CategoryRemoveChild", async (done) => {
        const added = await graphql(
          `
            mutation Add($parentId: UUID!, $childId: UUID!) {
              cat: CategoryAddChild(parentId: $parentId, childId: $childId) {
                id
                name
              }
            }
          `,
          {
            parentId: parent.id,
            childId: child.id,
          }
        )

        expect(added.errors).toBeUndefined()
        expect(added.data.cat.id).toEqual(child.id)

        const list1 = await graphql(
          `
            query List($id: UUID!) {
              cat: FindCategory(where: { id: $id }) {
                id
                children {
                  id
                }
              }
            }
          `,
          {
            id: parent.id,
          }
        )

        expect(list1.errors).toBeUndefined()
        expect(list1.data.cat.id).toEqual(parent.id)
        expect(list1.data.cat.children).toEqual([{ id: child.id }])

        const removed = await graphql(
          `
            mutation Remove($parentId: UUID!, $childId: UUID!) {
              cat: CategoryRemoveChild(parentId: $parentId, childId: $childId) {
                id
              }
            }
          `,
          {
            parentId: parent.id,
            childId: child.id,
          }
        )

        expect(removed.errors).toBeUndefined()
        expect(removed.data.cat).toEqual({ id: child.id })

        const list2 = await graphql(
          `
            query List($id: UUID!) {
              cat: FindCategory(where: { id: $id }) {
                id
                children {
                  id
                }
              }
            }
          `,
          {
            id: parent.id,
          }
        )

        expect(list2.errors).toBeUndefined()
        expect(list2.data.cat.id).toEqual(parent.id)
        expect(list2.data.cat.children).toEqual([])

        done()
      })
    })
  })
})
