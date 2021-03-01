import { RedisPubSub } from 'graphql-redis-subscriptions'
import { getRedis } from './redis'

const pubsub = new RedisPubSub({
	...getRedis()
})

export const getPubSub = (): RedisPubSub => pubsub
