import { buildSchema } from 'graphql'
import { GraphbackCoreMetadata, getModelByName } from '../src'

const setup = (model: string) => {
  const metadata = new GraphbackCoreMetadata(buildSchema(model))

  return { metadata }
}

test('Model has default crud configuration', async () => {
  const { metadata } = setup(`

"""
@model
"""
type Comment {
  id: ID!
}

"""
@model
@delta
"""
type Note {
  id: ID!
  title: String!
  """
  @oneToMany(field: 'note')
  """
  comments: [Comment]
}`)

  const models = metadata.getModelDefinitions()

  const { fields, relationships, primaryKey } = getModelByName('Note', models)

  expect(relationships).toHaveLength(1)
  expect(fields).toEqual({
    id: {
      name: 'id',
      type: 'ID',
      transient: false
    },
    title: {
      name: 'title',
      type: 'String',
      transient: false
    },
    comments: {
      name: 'id', // indicates that the id field should be selected
      type: 'ID',
      transient: false
    }
  })
  expect(primaryKey).toEqual({
    name: 'id',
    type: 'ID'
  })
})

test('Override CRUD config for model', async () => {
  const { metadata } = setup(`
"""
@model(create: false)
"""
type Note {
  id: ID!
  title: String!
}

"""
@model
"""
type Comment {
  id: ID!
  title: String!
}
`)

  const models = metadata.getModelDefinitions()

  const note = getModelByName('Note', models)
  const comment = getModelByName('Comment', models)
})
