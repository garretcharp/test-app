import type express from 'express'
import type { IResolvers } from 'apollo-server-express'
import { hostname } from 'os'
import { getPubSub } from '../../server/pubsub'

let hello = `${hostname()}--${process.env.SOME_SECRET ?? 'no secret provided for initial value'}`

const events = {
	change: 'HELLO_CHANGED'
}

const resolvers: IResolvers<unknown, { req: express.Request, res: express.Response }> = {
	Query: {
		hello: () => hello
	},
	Mutation: {
		setHello: (_, { text }: { text: string }) => {
			if (typeof text !== 'string') {
				console.log({ text })
				throw new Error('Invalid args')
			}

			hello = `${hostname()}--${text}`
			getPubSub().publish(events.change, { helloChanged: hello })

			return hello
		}
	},
	Subscription: {
		helloChanged: {
			subscribe: () => getPubSub().asyncIterator(events.change)
		}
	}
}

export default resolvers
