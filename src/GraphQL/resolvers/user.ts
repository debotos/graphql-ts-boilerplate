import jwt from 'jsonwebtoken'
import { combineResolvers } from 'graphql-resolvers'
import { AuthenticationError, UserInputError } from 'apollo-server'

import { isAdmin } from './middleware/authorization'

const expiresTime: string = process.env.JWT_TIMEOUT || '60m'

const createToken = async (user: any, secret: string, expiresIn: string) => {
	const { id, email, username, role } = user
	return await jwt.sign({ id, email, username, role }, secret, {
		expiresIn
	})
}

export default {
	Query: {
		users: async (_: any, __: any, { models }: any) => {
			return await models.User.findAll()
		},
		user: async (_: any, { id }: any, { models }: any) => {
			return await models.User.findByPk(id)
		},
		me: async (_: any, __: any, { models, me }: any) => {
			if (!me) return null
			return await models.User.findByPk(me.id)
		}
	},

	Mutation: {
		signUp: async (
			_: any,
			{ username, email, password, role }: any,
			{ models, jwtSecret }: any
		) => {
			interface signUpData {
				username: string
				email: string
				password: string
				role?: string
			}
			let newUser: signUpData = { username, email, password }
			if (role) {
				if (role === 'ADMIN' || role === 'PARTNER') {
					if (process.env.ADMIN_MODE) {
						/* Add 'ADMIN' or 'PARTNER' account only if ADMIN_MODE is active via env */
						newUser['role'] = role
					} else {
						throw new UserInputError(`You are not permitted to create ${role} account.`)
					}
				} else if (role === 'CONSUMER') {
					newUser['role'] = role
				} else {
					throw new UserInputError(
						"Invalid role input. Must be one of ['ADMIN', 'PARTNER', 'CONSUMER']"
					)
				}
			}
			const user = await models.User.create(newUser)

			return { token: createToken(user, jwtSecret, expiresTime) }
		},

		signIn: async (_: any, { login, password }: any, { models, jwtSecret }: any) => {
			const user = await models.User.findByLogin(login)

			if (!user) {
				throw new UserInputError('No user found with this login credentials.')
			}

			const isValid = await user.validatePassword(password)

			if (!isValid) {
				throw new AuthenticationError('Invalid password.')
			}

			return { token: createToken(user, jwtSecret, expiresTime) }
		},

		deleteUser: combineResolvers(isAdmin, async (_: any, { id }: any, { models }: any) => {
			return await models.User.destroy({
				where: { id }
			})
		})
	},

	User: {
		messages: async (user: any, __: any, { models }: any) => {
			return await models.Message.findAll({
				order: [['createdAt', 'DESC']],
				where: {
					userId: user.id
				}
			})
		}
	}
}
