import type { IResolvers } from 'apollo-server-express'
import { getPubSub } from '../../server/pubsub'

let hello = process.env.SOME_SECRET ?? 'no secret provided for initial value'

const events = {
	change: 'HELLO_CHANGED'
}

const resolvers: IResolvers<unknown, unknown> = {
	Query: {
		hello: (): string => hello
	},
	Mutation: {
		setHello: (_parent: unknown, { text }: { text: string }): string => {
			if (typeof text !== 'string') {
				console.log({ text })
				throw new Error('Invalid args')
			}

			hello = text
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
