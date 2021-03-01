import { gql } from 'apollo-server-express'

export default gql`
	type Query {
		hello: String!
	}

	type Mutation {
		setHello(text: String!): String!
	}

	type Subscription {
		helloChanged: String!
	}
`
