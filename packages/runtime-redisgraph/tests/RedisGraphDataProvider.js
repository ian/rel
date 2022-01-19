import initEnv from './setup/__util__.js'
import cypher from '../src/cypher/src/index.js'
import { test } from 'uvu'
import * as assert from 'uvu/assert'

let redis, createTestingContext

test.before(async () => {
  try {
    const result = await initEnv()
    createTestingContext = result.createTestingContext
    redis = result.redis
  } catch (e) {
    console.log(e)
  }
})

test.after(async () => {
  try {
    await redis.disconnect()
    setTimeout(() => {
      process.exit(0)
    }, 5000)
  } catch (e) {
    console.log(e)
  }
})

test.after.each(async () => {
  try {
    await cypher.deleteAll()
  } catch (e) {
    console.log(e)
  }
})

let context

const fields = ['_id', 'text']

const todoSchema = `
  type Todos {
    text: String @unique,
    email: String @constraint(format: "email")
    order: Int
  }
  `

const defaultTodoSeed = [
  {
    text: 'todo',
    order: 1
  },
  {
    text: 'todo2',
    order: 2
  }
]

test('Test crud', async () => {
  context = await createTestingContext(todoSchema, {
    seedData: {
      Todos: defaultTodoSeed
    }
  })
  let todo = await context.providers.Todos.create({
    text: 'create a todo'
  })
 
  assert.is(todo.text, 'create a todo')

  todo = await context.providers.Todos.update(
    {
      _id: todo._id,
      text: 'my updated first todo'
    },
    fields
  )

  assert.is(todo.text, 'my updated first todo')
  const data = await context.providers.Todos.delete({ _id: todo._id }, fields)
  assert.is(data._id, todo._id)
})

test('find first 1 todo(s) excluding first todo', async () => {
  context = await createTestingContext(todoSchema, {
    seedData: {
      Todos: defaultTodoSeed
    }
  })
  const todos = await context.providers.Todos.findBy(
    { page: { limit: 1, offset: 1 }, orderBy: [{ field: 'order' }] },
    ['text']
  )

  // check that count is total number of seeded Todos
  const count = await context.providers.Todos.count()
  assert.is(count, defaultTodoSeed.length)

  // check limit applied
  assert.is(todos.length, 1)

  assert.is(todos[0].text, 'todo2')
})

test('find Todo by text', async () => {
  context = await createTestingContext(todoSchema, {
    seedData: {
      Todos: defaultTodoSeed
    }
  })
  const all = await context.providers.Todos.findBy()
  const todos = await context.providers.Todos.findBy(
    {
      filter: {
        text: { eq: all[0].text }
      }
    },
    ['_id']
  )
  assert.ok(todos.length > 0)
  const count = await context.providers.Todos.count({
    text: { eq: all[0].text }
  })
  assert.is(count, todos.length)
})

test('find Todo by text, limit defaults to complete set', async () => {
  context = await createTestingContext(todoSchema, {
    seedData: {
      Todos: defaultTodoSeed
    }
  })
  const text = 'todo-test'
  for (let i = 0; i < 11; i++) {
    await context.providers.Todos.create({
      text: text + "-" + i.toString()
    })
  }
  const todos = await context.providers.Todos.findBy(
    { filter: { text: { contains: text } }, page: { offset: 0 } },
    fields
  )

  assert.is(todos.length, 11)

  const count = await context.providers.Todos.count({ text: { contains: text } })
  assert.is(count, 11)
})

test('find by text offset defaults to 0', async () => {
  context = await createTestingContext(todoSchema, {
    seedData: {
      Todos: defaultTodoSeed
    }
  })
  const text = 'todo-test'
  for (let i = 0; i < 2; i++) {
    await context.providers.Todos.create({
      text: text + "-" + i.toString()
    })
  }
  const todos = await context.providers.Todos.findBy(
    { filter: { text: { contains: text } }, page: { limit: 1 } },
    fields
  )
  assert.is(/todo-test/.test(todos[0].text), true)
})

test('find first 1 todos by text', async () => {
  context = await createTestingContext(todoSchema, {
    seedData: {
      Todos: defaultTodoSeed
    }
  })
  const text = 'todo-test'
  for (let i = 0; i < 2; i++) {
    await context.providers.Todos.create({
      text: text + "-" + i.toString()
    })
  }

  const todos = await context.providers.Todos.findBy(
    {
      filter: {
        text: { contains: text }
      },
      page: { limit: 1, offset: 0 }
    },
    fields
  )
  assert.is(todos.length, 1)
  assert.is(/todo-test/.test(todos[0].text), true)
})

test('test orderby w/o order', async () => {
  context = await createTestingContext(todoSchema, {
    seedData: {
      Todos: [
        { text: 'todo3' },
        { text: 'todo1' },
        { text: 'todo4' },
        { text: 'todo2' },
        { text: 'todo5' }
      ]
    }
  })

  const todos = await context.providers.Todos.findBy(
    { filter: { text: { contains: 'todo' } }, orderBy: [{ field: 'text' }] },
    fields
  )
  for (let t = 0; t < todos.length; t++) {
    assert.is(todos[t].text, `todo${t + 1}`)
  }
})

test('test orderby with desc order', async () => {
  context = await createTestingContext(todoSchema, {
    seedData: {
      Todos: [
        { text: 'todo3' },
        { text: 'todo1' },
        { text: 'todo4' },
        { text: 'todo2' },
        { text: 'todo5' }
      ]
    }
  })

  const todos = await context.providers.Todos.findBy(
    {
      filter: { text: { contains: 'todo' } },
      orderBy: [{ field: 'text', order: 'desc' }]
    },
    fields
  )
  for (let t = 0; t < todos.length; t++) {
    assert.is(todos[t].text, `todo${5 - t}`)
  }
})

test.skip('createdAt', async () => {
  context = await createTestingContext(`
    type Note {
      text: String
    }
    `)

  //MockDate.set(new Date(2020, 5, 26, 18, 29, 23))

  const cDate = new Date()
  const res = await context.providers.Note.create({ text: 'asdf' })
  assert.is(res.createdAt, cDate.getTime())
  assert.is(res.createdAt, res.updatedAt)
})

test.skip('updatedAt', async () => {
  context = await createTestingContext(`
    type Note {
      text: String
    }
    `)

  //MockDate.set(new Date(2020, 5, 26, 18, 29))

  const createDate = new Date()

  const res = await context.providers.Note.create({ text: 'asdf' })
  assert.is(res.updatedAt, createDate.getTime())

  //MockDate.set(new Date(2020, 5, 26, 18, 30))
  const next = await context.providers.Note.update(
    {
      ...res,
      text: 'asdftrains'
    },
    ['updatedAt', 'createdAt']
  )

  const updateDate = new Date()
  assert.is(next.updatedAt, updateDate.getTime())
  assert.is(next.createdAt, createDate.getTime())
})

test('select only requested fields', async () => {
  context = await createTestingContext(
    `
    type Todos {
     text: String,
     description: String
    }
    `,
    {
      seedData: {
        Todos: [
          { text: 'todo1', description: 'first todo' },
          { text: 'todo2', description: 'second todo' },
          { text: 'todo3', description: 'third todo' }
        ]
      }
    }
  )

  const todos = await context.providers.Todos.findBy({}, ['_id', 'text'])

  assert.is(todos.length, 3)
  todos.forEach(todo => {
    assert.not.type(todo._id, 'undefined')
    assert.not.type(todo.text, 'undefined')
    assert.type(todo.description, 'undefined')
  })

  const createdTodo = await context.providers.Todos.create({
    text: 'new todo',
    description: 'todo add description'
  })
  assert.not.type(createdTodo._id, 'undefined')

  const updatedTodo = await context.providers.Todos.update(
    { _id: createdTodo._id, text: 'updated todo' },
    ['text']
  )
  assert.type(updatedTodo.description, 'undefined')
  assert.is(updatedTodo.text, 'updated todo')

  const deletedTodo = await context.providers.Todos.update(
    { _id: createdTodo._id },
    ['_id', 'text', 'description']
  )
  assert.is(deletedTodo._id, createdTodo._id)
  assert.is(deletedTodo.text, 'updated todo')
  assert.is(deletedTodo.description, 'todo add description')
})

test('get todos with field value not in a given arrray argument', async () => {
  context = await createTestingContext(
    `
    type Todo {
     items: Int
    }
    `,
    {
      seedData: {
        Todo: [
          {
            items: 1
          },
          {
            items: 2
          },
          {
            items: 3
          },
          {
            items: 4
          },
          {
            items: 5
          },
          {
            items: 6
          },
          {
            items: 8
          }
        ]
      }
    }
  )

  const { providers } = context

  // verify that not in operator works
  const allTodos = await providers.Todo.findBy()
  const newTodoItems = 2709
  await providers.Todo.create({ items: newTodoItems })
  const allTodosAfterCreation = await providers.Todo.findBy()

  assert.is(allTodosAfterCreation.length, allTodos.length + 1) // verify that a new todo was created

  // retrieve all todo that do not have the newTodoItems using the in operator and verify

  const oldTodos = await providers.Todo.findBy({
    filter: {
      not: {
        items: {
          in: [newTodoItems]
        }
      }
    }
  })

  assert.equal(oldTodos, allTodos) // assert that we did not retrieve the newly added todo item
})

test('a && (b || c)', async () => {
  context = await createTestingContext(
    `
    type Todo {
      a: Int
      b: Int
      c: Int
    }
    `,
    {
      seedData: {
        Todo: [
          {
            a: 1,
            b: 5,
            c: 8
          },
          {
            a: 1,
            b: 2,
            c: 10
          },
          {
            a: 1,
            b: 5,
            c: 3
          },
          {
            a: 6,
            b: 6,
            c: 3
          }
        ]
      }
    }
  )

  const filter = {
    a: {
      eq: 1
    },
    or: [
      {
        c: {
          eq: 6
        }
      },
      {
        b: {
          eq: 5
        }
      }
    ]
  }

  const items = await context.providers.Todo.findBy({ filter })

  assert.is(items.length, 2)
})

test('a && (b || c) starting at first OR', async () => {
  context = await createTestingContext(
    `
    type Todo {
      a: Int
      b: Int
      c: Int
    }
    `,
    {
      seedData: {
        Todo: [
          {
            a: 1,
            b: 5,
            c: 8
          },
          {
            a: 1,
            b: 2,
            c: 10
          },
          {
            a: 1,
            b: 5,
            c: 3
          },
          {
            a: 6,
            b: 6,
            c: 3
          }
        ]
      }
    }
  )

  const filter = {
    or: [
      {
        a: {
          eq: 1
        },
        or: [
          {
            c: {
              eq: 6
            }
          },
          {
            b: {
              eq: 5
            }
          }
        ]
      }
    ]
  }

  const items = await context.providers.Todo.findBy({ filter })

  assert.is(items.length, 2)
})

test('a && (c || b) from nested OR', async () => {
  context = await createTestingContext(
    `
    type Todo {
      a: Int
      b: Int
      c: Int
    }
    `,
    {
      seedData: {
        Todo: [
          {
            a: 1,
            b: 1,
            c: 8
          },
          {
            a: 9,
            b: 2,
            c: 10
          },
          {
            a: 1,
            b: 5,
            c: 3
          },
          {
            a: 1,
            b: 6,
            c: 6
          }
        ]
      }
    }
  )

  const filter = {
    or: [
      {
        a: {
          eq: 1
        },
        or: [
          {
            c: {
              eq: 6
            }
          },
          {
            b: {
              eq: 5
            }
          }
        ]
      }
    ]
  }

  const items = await context.providers.Todo.findBy({ filter })

  assert.is(items.length, 2)
})

test('a || a || a', async () => {
  context = await createTestingContext(
    `
    type Todo {
      a: Int
      b: Int
      c: Int
    }
    `,
    {
      seedData: {
        Todo: [
          {
            a: 1,
            b: 5,
            c: 8
          },
          {
            a: 2,
            b: 2,
            c: 10
          },
          {
            a: 3,
            b: 5,
            c: 3
          },
          {
            a: 6,
            b: 6,
            c: 3
          }
        ]
      }
    }
  )

  const filter = {
    or: [
      {
        a: {
          eq: 1
        }
      },
      {
        a: {
          eq: 2
        }
      },
      {
        a: {
          eq: 3
        }
      }
    ]
  }

  const items = await context.providers.Todo.findBy({ filter })

  assert.is(items.length, 3)
})

test('a || (a && b)', async () => {
  context = await createTestingContext(
    `
    type Todo {
      a: Int
      b: Int
      c: Int
    }
    `,
    {
      seedData: {
        Todo: [
          {
            a: 1,
            b: 5,
            c: 8
          },
          {
            a: 2,
            b: 3,
            c: 10
          },
          {
            a: 2,
            b: 3,
            c: 3
          },
          {
            a: 6,
            b: 6,
            c: 3
          }
        ]
      }
    }
  )

  const filter = {
    or: [
      {
        a: {
          eq: 1
        }
      },
      {
        or: [
          {
            a: {
              eq: 2
            },
            b: {
              eq: 3
            }
          }
        ]
      }
    ]
  }

  const items = await context.providers.Todo.findBy({ filter })

  assert.is(items.length, 3)
})

test('Aggregations', async () => {
  context = await createTestingContext(
    `
    type Todo {
      a: Int
      b: Int
      c: Int
    }
    `,
    {
      seedData: {
        Todo: [
          {
            a: 1,
            b: 5,
            c: 8
          },
          {
            a: 2,
            b: 3,
            c: 10
          },
          {
            a: 2,
            b: 3,
            c: 3
          },
          {
            a: 6,
            b: 6,
            c: 3
          }
        ]
      }
    }
  )

  const args = {__arguments: [{of: {value: 'a'}}]}
  let items = await context.providers.Todo.findBy({}, [],{count: args})
  assert.is(items.length, 1)
  assert.is(items[0].count, 4)
  items = await context.providers.Todo.findBy({}, [],{sum: args})
  assert.is(items.length, 1)
  assert.is(items[0].sum, 11)
  items = await context.providers.Todo.findBy({}, [],{min: args})
  assert.is(items.length, 1)
  assert.is(items[0].min, 1)
  items = await context.providers.Todo.findBy({}, [],{max: args})
  assert.is(items.length, 1)
  assert.is(items[0].max, 6)
  items = await context.providers.Todo.findBy({}, [],{avg: args})
  assert.is(items.length, 1)
  assert.is(items[0].avg, 2.75) 
})

test('Aggregations with group', async () => {
  context = await createTestingContext(
    `
    type Todo {
      a: Int
      b: Int
      c: Int
    }
    `,
    {
      seedData: {
        Todo: [
          {
            a: 1,
            b: 5,
            c: 8
          },
          {
            a: 2,
            b: 3,
            c: 10
          },
          {
            a: 2,
            b: 2,
            c: 3
          },
          {
            a: 6,
            b: 6,
            c: 3
          }
        ]
      }
    }
  )
  
  const filter = {
    a: {
      gt: 1
    },
  }
  
  const selectedFields = ["a"]

  const args = {__arguments: [{of: {value: 'b'}}]}
  let items = await context.providers.Todo.findBy({filter}, selectedFields,{count: args})
  assert.is(items.length, 2)
  assert.is(items[0].count, 2)
  assert.is(items[1].count, 1)
  items = await context.providers.Todo.findBy({filter}, selectedFields,{sum: args})
  assert.is(items.length, 2)
  assert.is(items[0].sum, 5)
  assert.is(items[1].sum, 6)
  items = await context.providers.Todo.findBy({filter}, selectedFields,{min: args})
  assert.is(items.length, 2)
  assert.is(items[0].min, 2)
  assert.is(items[1].min, 6)
  items = await context.providers.Todo.findBy({filter}, selectedFields,{max: args})
  assert.is(items.length, 2)
  assert.is(items[0].max, 3)
  assert.is(items[1].max, 6)
  items = await context.providers.Todo.findBy({filter}, selectedFields,{avg: args})
  assert.is(items.length, 2)
  assert.is(items[0].avg, 2.5)
  assert.is(items[1].avg, 6)
})

test('Aggregations with group and DISTINCT', async () => {
  context = await createTestingContext(
    `
    type Todo {
      a: Int
      b: Int
      c: Int
    }
    `,
    {
      seedData: {
        Todo: [
          {
            a: 1,
            b: 5,
            c: 8
          },
          {
            a: 2,
            b: 3,
            c: 10
          },
          {
            a: 2,
            b: 2,
            c: 3
          },
          {
            a: 2,
            b: 2,
            c: 3
          },
          {
            a: 6,
            b: 6,
            c: 3
          }
        ]
      }
    }
  )

  const filter = {
    a: {
      gt: 1
    },
  }

  const selectedFields = ["a"]

  const args = {__arguments: [{of: {value: 'b'}}, {distinct: {value: true}}]}

  let items = await context.providers.Todo.findBy({filter}, selectedFields,{count: args})
  assert.is(items.length, 2)
  assert.is(items[0].count, 2)
  assert.is(items[1].count, 1)
  items = await context.providers.Todo.findBy({filter}, selectedFields,{sum: args})
  assert.is(items.length, 2)
  assert.is(items[0].sum, 5)
  assert.is(items[1].sum, 6)
  items = await context.providers.Todo.findBy({filter}, selectedFields,{min: args})
  assert.is(items.length, 2)
  assert.is(items[0].min, 2)
  assert.is(items[1].min, 6)
  items = await context.providers.Todo.findBy({filter}, selectedFields,{max: args})
  assert.is(items.length, 2)
  assert.is(items[0].max, 3)
  assert.is(items[1].max, 6)
  items = await context.providers.Todo.findBy({filter}, selectedFields,{avg: args})
  assert.is(items.length, 2)
  assert.is(items[0].avg, 2.5)
  assert.is(items[1].avg, 6)
})

test('Test UNIQUE constraint', async () => {
  context = await createTestingContext(todoSchema, {
    seedData: {
      Todos: defaultTodoSeed
    }
  })
  try {
    await context.providers.Todos.create({
      text: 'todo'
    },[])
    assert.unreachable()
  } catch(e) {}

  const todo = await context.providers.Todos.create({
      text: 'todo3'
    },[])
  try {
    await context.providers.Todos.update(
      {
        _id: todo._id,
        text: 'todo'
      },
      fields)

    assert.unreachable()
  } catch(e) {}

  await context.providers.Todos.delete({ _id: todo._id }, fields)
  
  try {
    await context.providers.Todos.create({
      text: 'todo3'
    })
    assert.unreachable()
  } catch(e) {}
})

test.run()

