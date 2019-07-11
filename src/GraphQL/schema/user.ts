import { gql } from 'apollo-server-express'

export default gql`
	extend type Query {
		users: [User!]
		user(id: ID!): User
		me: User
	}

	extend type Mutation {
		signUp(username: String!, email: String!, password: String!, role: Role): Token!
		signIn(login: String!, password: String!): Token!
		deleteUser(id: ID!): Boolean!
	}

	type Token {
		token: String!
	}

	enum Role {
		ADMIN
		PARTNER
		CONSUMER
	}

	type User {
		id: ID!
		username: String!
		email: String!
		role: Role!
		messages: [Message!]
	}
`
