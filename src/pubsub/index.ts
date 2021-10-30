import MQEmitter from "mqemitter-redis"
// import { RedisPubSub } from 'graphql-redis-subscriptions'

const connection = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
}

export const emitter = MQEmitter(connection)

export async function publish<T>(topic: string, payload: T): Promise<void> {
  return emitter.emit({
    topic,
    payload,
  })
}
