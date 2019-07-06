import { combineResolvers } from 'graphql-resolvers'

import { isAuthenticated, isMessageOwner } from './middleware/authorization'

export default {
	Query: {
		messages: async (_: any, { offset = 0, limit = 100 }: any, { models }: any) => {
			return await models.Message.findAll({ offset, limit })
		},
		message: async (_: any, { id }: any, { models }: any) => {
			return await models.Message.findByPk(id)
		}
	},

	Mutation: {
		createMessage: combineResolvers(
			isAuthenticated,
			async (_: any, { text }: any, { me, models }: any) => {
				return await models.Message.create({
					text,
					userId: me.id
				})
			}
		),

		deleteMessage: combineResolvers(
			isAuthenticated,
			isMessageOwner,
			async (_: any, { id }: any, { models }: any) => {
				return await models.Message.destroy({ where: { id } })
			}
		)
	},

	Message: {
		user: async (message: any, __: any, { models }: any) => {
			return await models.User.findByPk(message.userId)
		}
	}
}
