import MockDate from 'mockdate'
import { buildQuery } from '../src/queryBuilder.js'
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
    }, 1000)
  } catch (e) {
    console.log(e)
  }
})

test.after.each(async () => {
  try {
    await cypher.deleteAll()
    MockDate.reset()
  } catch (e) {
    console.log(e)
  }
})

const postSchema = `
      """@model"""
      type Post {
        id: ID!
        text: String
        likes: Int
      }

      `

const defaultPostSeed = [
  { text: 'post', likes: 300 },
  { text: 'post2', likes: 50 },
  { text: 'post3', likes: 1500 }
]

let context

test('can filter ID', async () => {
  context = await createTestingContext(postSchema)

  const newPost = await context.providers.Post.create({
    text: 'hello',
    likes: 100
  })

  const findPost = await context.providers.Post.findBy({
    filter: { id: { eq: newPost.id } }
  })
  assert.is(findPost.length, 1)
  assert.is(findPost[0].text, newPost.text)
})

test('can filter using AND', async () => {
  context = await createTestingContext(postSchema, {
    seedData: {
      Post: defaultPostSeed
    }
  })

  const posts = await context.providers.Post.findBy({
    filter: {
      and: [
        {
          text: { eq: 'post' }
        },
        {
          likes: { eq: 300 }
        }
      ]
    }
  })

  assert.ok(posts.length >= 1)
  for (const post of posts) {
    assert.is(post.text, 'post')
    assert.is(post.likes, 300)
  }
})

test('can filter using OR', async () => {
  context = await createTestingContext(postSchema, {
    seedData: {
      Post: defaultPostSeed
    }
  })

  const posts = await context.providers.Post.findBy({
    filter: {
      or: [
        {
          likes: { eq: 300 }
        },
        {
          text: { eq: 'post2' }
        }
      ]
    }
  })
  assert.is(posts.length, 2)
  for (const post of posts) {
    assert.ok(post.text === 'post2' || post.likes === 300)
  }
})

test('can filter using list of OR conditions', async () => {
  context = await createTestingContext(postSchema, {
    seedData: {
      Post: defaultPostSeed
    }
  })

  const posts = await context.providers.Post.findBy({
    filter: {
      or: [
        {
          text: { eq: 'post2' }
        },
        {
          likes: { eq: 300 }
        },
        {
          text: { eq: 'post3' }
        }
      ]
    }
  })
  assert.is(posts.length, 3)
})

test('can filter using NOT', async () => {
  context = await createTestingContext(postSchema, {
    seedData: {
      Post: defaultPostSeed
    }
  })

  const posts = await context.providers.Post.findBy({
    filter: {
      not: [
        {
          text: { eq: 'post2' }
        },
        {
          likes: { eq: 300 }
        }
      ]
    }
  })

  assert.equal(posts.length, 1)
  for (const post of posts) {
    assert.not.equal(post.text, 'post2')
    assert.not.equal(post.likes, 300)
  }
})

test('can filter using between operator', async () => {
  context = await createTestingContext(postSchema, {
    seedData: {
      Post: defaultPostSeed
    }
  })

  const posts = await context.providers.Post.findBy({
    filter: {
      likes: { between: [250, 350] }
    }
  })

  assert.ok(posts.length >= 1)
  for (const post of posts) {
    assert.ok(post.likes <= 350)
    assert.ok(post.likes >= 250)
  }
})

test('can filter using not between operator', async () => {
  context = await createTestingContext(postSchema, {
    seedData: {
      Post: defaultPostSeed
    }
  })

  const posts = await context.providers.Post.findBy({
    filter: {
      not: {
        likes: { between: [250, 350] }
      }
    }
  })

  assert.ok(posts.length >= 1)
  for (const post of posts) {
    assert.ok(post.likes < 250 || post.likes > 350)
  }
})

test('can use nested filters', async () => {
  context = await createTestingContext(postSchema, {
    seedData: {
      Post: defaultPostSeed
    }
  })

  const posts = await context.providers.Post.findBy({
    filter: {
      and: [
        {
          or: [
            { likes: { between: [250, 350] } },
            { likes: { between: [25, 75] } }
          ]
        },
        {
          or: [{ text: { eq: 'post' } }, { text: { eq: 'post2' } }]
        }
      ]
    }
  })

  assert.ok(posts.length >= 1)
  for (const post of posts) {
    assert.ok(
      (post.likes >= 250 && post.likes <= 350) ||
          (post.likes >= 25 && post.likes <= 75)
    )

    assert.ok(post.text === 'post' || post.text === 'post2')
  }
})

test('can use contains operator', async () => {
  context = await createTestingContext(postSchema, {
    seedData: {
      Post: defaultPostSeed
    }
  })

  const posts = await context.providers.Post.findBy({
    filter: {
      text: { contains: 'post' }
    }
  })

  assert.ok(posts.length >= 1)
  for (const post of posts) {
    assert.match(post.text, 'post')
  }
})

test('can use startsWith operator', async () => {
  context = await createTestingContext(postSchema, {
    seedData: {
      Post: defaultPostSeed
    }
  })

  const posts = await context.providers.Post.findBy({
    filter: {
      text: { startsWith: 'post' }
    }
  })

  assert.ok(posts.length >= 1)
  for (const post of posts) {
    assert.match(post.text, /^post/g)
  }
})

test('can use endsWith operator', async () => {
  context = await createTestingContext(postSchema, {
    seedData: {
      Post: defaultPostSeed
    }
  })

  const posts = await context.providers.Post.findBy({
    filter: {
      text: { endsWith: 'post' }
    }
  })

  assert.ok(posts.length, 1)
  for (const post of posts) {
    assert.match(post.text, /post$/g)
  }
})

test('escaping regex strings', async () => {
  context = await createTestingContext(postSchema, {
    seedData: {
      Post: [...defaultPostSeed, { text: 'p..t', likes: 4500 }]
    }
  })

  const posts = await context.providers.Post.findBy({
    filter: {
      text: { contains: 'p..t' }
    }
  })

  assert.ok(posts.length >= 1)
  for (const post of posts) {
    assert.match(post.text, /p\.\.t/g)
  }
})

test('can filter @versioned metadata fields', async () => {
  context = await createTestingContext(`
    """
    @model
    @versioned
    """
    type Post {
    id: ID!
    text: String
    }
    `)

  const startTime = 1590679886048

  MockDate.set(startTime)

  let currentTime = startTime

  // Create some posts

  const data = ['hi guys', 'not yet', 'bye guys']

  for (let i = 0; i < data.length; i++) {
    currentTime = currentTime + 3000
    MockDate.set(currentTime)
    await context.providers.Post.create({ text: data[i] })
  }

  // Get all posts created since startTime
  const posts = await context.providers.Post.findBy({
    filter: {
      createdAt: { gt: startTime }
    }
  })
  assert.is(posts.length, 3)
  assert.equal(
    posts.map((post) => post.text),
    data
  )

  // Get all posts created after the first post
  const newPosts = await context.providers.Post.findBy({
    filter: { createdAt: { gt: posts[0].createdAt } }
  })
  assert.is(newPosts.length, 2)
  assert.equal(
    newPosts.map(post => post.text),
    ['not yet', 'bye guys']
  )
})

test('a && (b || c)', () => {
  const inputQuery = {
    a: {
      eq: 1
    },
    or: [
      {
        b: {
          eq: 2
        }
      },
      {
        c: {
          eq: 3
        }
      }
    ]
  }

  const outputQuery = buildQuery(inputQuery)
  const expected = {
    a: {
      eq: ['=', 1]
    },
    or: [
      {
        b: {
          eq: ['=', 2]
        }
      },
      {
        c: {
          eq: ['=', 3]
        }
      }
    ]
  }

  assert.equal(outputQuery, expected)
})

test('a || b || c starting at root or operator of query', () => {
  const inputQuery = {
    or: [
      {
        a: {
          eq: 1
        }
      },
      {
        b: {
          eq: 2
        }
      },
      {
        c: {
          eq: 3
        }
      }
    ]
  }

  const outputQuery = buildQuery(inputQuery)
  const expected = [
    {
      a: {
        eq: ['=', 1]
      }
    },
    {
      b: {
        eq: ['=', 2]
      }
    },
    {
      c: {
        eq: ['=', 3]
      }
    }
  ]

  assert.equal(outputQuery.or, expected)
  assert.equal(Object.keys(outputQuery), ['or'])
})

test('(a && b) && (c || c)', () => {
  const inputQuery = {
    or: [
      {
        a: {
          eq: 1
        },
        b: {
          eq: 2
        },
        or: [
          {
            c: {
              eq: 3
            }
          },
          {
            c: {
              eq: 2
            }
          }
        ]
      }
    ]
  }

  const outputQuery = buildQuery(inputQuery)

  const expected = {
    or: [
      {
        a: {
          eq: ['=', 1]
        },
        b: {
          eq: ['=', 2]
        },
        or: [
          {
            c: {
              eq: ['=', 3]
            }
          },
          {
            c: {
              eq: ['=', 2]
            }
          }
        ]
      }
    ]
  }

  assert.equal(outputQuery, expected)
})

test('a && b && (c || b) from query root (explicit AND)', () => {
  const inputQuery = {
    a: {
      eq: 1
    },
    and: [
      {
        b: {
          eq: 2
        }
      }
    ],
    or: [
      {
        c: {
          eq: 3
        }
      },
      {
        b: {
          eq: 4
        }
      }
    ]
  }

  const outputQuery = buildQuery(inputQuery)

  const expected = {
    a: {
      eq: ['=', 1]
    },
    and: [
      {
        b: {
          eq: ['=', 2]
        }
      }
    ],
    or: [
      {
        c: {
          eq: ['=', 3]
        }
      },
      {
        b: {
          eq: ['=', 4]
        }
      }
    ]
  }

  assert.equal(outputQuery, expected)
})

test.run()
