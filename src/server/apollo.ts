import type express from 'express'
import type http from 'http'
import { ApolloServer } from 'apollo-server-express'
import { resolvers, typeDefs } from '../graphql'

let server: ApolloServer

export const getApollo = (app: express.Express, httpServer: http.Server): ApolloServer => {
	if (!server) {
		server = new ApolloServer({
			resolvers,
			typeDefs,
			context: ({ req, res }) => {
				return { req, res }
			},
			playground: process.env.NODE_ENV !== 'production'
		})

		server.applyMiddleware({ app })
		server.installSubscriptionHandlers(httpServer)
	}

	return server
}
