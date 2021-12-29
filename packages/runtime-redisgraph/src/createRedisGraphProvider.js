import { RedisGraphProvider } from './RedisGraphProvider.js'

export function createRedisGraphProvider () {
  return (model) => {
    return new RedisGraphProvider(model)
  }
}
