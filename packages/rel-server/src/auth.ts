import jwt from 'jsonwebtoken'
import Cookies from "fastify-cookie"
import { FastifyInstance } from 'fastify'

const DEFAULT_SESSION_LENGTH_IN_DAYS = 30
const DEFAULT_COOKIE_NAME = 'auth_token'

type Opts = {
  sessionLengthInDays?: number
  cookieName?: string
  secret: string
}

export default async function AuthPlugin(
  app: FastifyInstance,
  opts: Opts
): Promise<void> {
  const {
    sessionLengthInDays = DEFAULT_SESSION_LENGTH_IN_DAYS,
    cookieName = DEFAULT_COOKIE_NAME,
    secret,
  } = opts

  if (!secret) {
    throw new Error("Missing secret key for JWT - Please set this via the auth.secret param")
  }

  app.register(Cookies, {
    secret, // for cookies signature
    parseOptions: {}, // options for parsing cookies
  })
  
  app.route({
    url: '/session',
    method: ['GET'],
    handler: async (req, reply) => {
      const token = req.cookies[cookieName]
      const decoded = jwt.decode(token)

      if (!decoded) {
        reply.status(401).send()
      } else {
        reply.status(200).send(decoded)
      }
    },
  })

  app.route({
    url: '/session',
    method: ['POST'],
    handler: async (req, reply) => {
      try {
        // @todo - use a adapter callback to load / get the user
        const user = {}

        const token = jwt.sign(
          {
            ...user,
            exp:
              Math.floor(Date.now() / 1000) +
              60 * 60 * 24 * sessionLengthInDays,
          },
          secret
        )

        reply.status(200).setCookie(cookieName, token, { path: '/' }).send(user)
      } catch (error) {
        console.error(error)
        reply.status(500).send()
      }
    },
  })

  app.route({
    url: '/session',
    method: 'DELETE',
    handler: async (req, reply) => {
      reply.status(200).clearCookie(cookieName).send()
    },
  })
}
