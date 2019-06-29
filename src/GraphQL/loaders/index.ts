const createUsersWithMessages = async (models: any) => {
	await models.User.create(
		{
			username: 'debotos',
			messages: [
				{
					text: 'Published the boilerplate'
				}
			]
		},
		{
			include: [models.Message]
		}
	)

	await models.User.create(
		{
			username: 'ripon',
			messages: [
				{
					text: 'Happy to see ...'
				},
				{
					text: 'is it complete?'
				}
			]
		},
		{
			include: [models.Message]
		}
	)
}

export { createUsersWithMessages }
