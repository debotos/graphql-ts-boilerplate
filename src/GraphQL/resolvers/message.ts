export default {
	Query: {
		messages: async (_: any, __: any, { models }: any) => {
			return await models.Message.findAll()
		},
		message: async (_: any, { id }: any, { models }: any) => {
			return await models.Message.findByPk(id)
		}
	},

	Mutation: {
		createMessage: async (_: any, { text }: any, { me, models }: any) => {
			return await models.Message.create({
				text,
				userId: me.id
			})
		},

		deleteMessage: async (_: any, { id }: any, { models }: any) => {
			return await models.Message.destroy({ where: { id } })
		}
	},

	Message: {
		user: async (message: any, __: any, { models }: any) => {
			return await models.User.findByPk(message.userId)
		}
	}
}
