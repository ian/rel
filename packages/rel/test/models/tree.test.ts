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
      expect(typeDefs).toMatch(`TopLevelCategories: [Category]!`)
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
    const { graphql } = server
    let parent, child

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

    it("should add categories", async (done) => {
      const {
        data: { added },
      } = await graphql(
        `
          mutation Add($parentId: UUID!, $childId: UUID!) {
            added: CategoryAddChild(parentId: $parentId, childId: $childId) {
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

      expect(added.id).toEqual(child.id)

      const {
        data: { category },
      } = await graphql(
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

      expect(category.id).toEqual(parent.id)
      expect(category.children).toEqual([{ id: child.id }])

      done()
    })

    it("should set parents", async (done) => {
      const set = await graphql(
        `
          mutation Set($parentId: UUID!, $childId: UUID!) {
            parent: CategorySetParent(parentId: $parentId, childId: $childId) {
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

    describe("removing", () => {
      it("should remove the parent", async (done) => {
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
      it("should remove the child", async (done) => {
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
