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

  app.register(Cookies, {
    secret, // for cookies signature
    parseOptions: {}, // options for parsing cookies
  })
  
  app.route({
    url: '/session',
    method: ['GET'],
    handler: async (req, reply) => {
      // const cookies = new Cookies(req, reply)
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
      // const cookies = new Cookies(req, reply)

      try {
        const auth = req.headers.authorization

        // let magic = new MagicAdmin(process.env.MAGIC_SECRET_KEY)
        // await magic.token.validate(didToken)
        // let { email } = await magic.users.getMetadataByToken(didToken)

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
        console.log(error)
        reply.status(500).send()
      }
    },
  })

  app.route({
    url: '/session',
    method: 'DELETE',
    handler: async (req, reply) => {
      // const cookies = new Cookies(req, reply)
      reply.status(200).clearCookie(cookieName).send()
    },
  })
}
