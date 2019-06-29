const message = (sequelize: any, DataTypes: any) => {
	const Message = sequelize.define('message', {
		text: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
		}
	})

	Message.associate = (models: any) => {
		Message.belongsTo(models.User)
	}

	return Message
}

export default message
