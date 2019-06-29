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

	User: {
		messages: async (user: any, __: any, { models }: any) => {
			return await models.Message.findAll({
				where: {
					userId: user.id
				}
			})
		}
	}
}
