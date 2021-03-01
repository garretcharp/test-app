import Redis from 'ioredis'

const subscriber = new Redis({
	host: 'localhost',
	port: 6379
})

const publisher = new Redis({
	host: 'localhost',
	port: 6379
})

export const getRedis = (): { subscriber: Redis.Redis, publisher: Redis.Redis } => ({ subscriber, publisher })
