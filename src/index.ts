import { getServer } from './server/http'
import { getApp } from './server/express'
import { getApollo } from './server/apollo'

const start = () => {
	const app = getApp()
	const server = getServer(app)
	getApollo(app, server)

	server.listen(parseInt(process.env.PORT as string, 10), () => console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/graphql`))
}

start()
