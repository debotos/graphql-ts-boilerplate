import { Sequelize } from 'sequelize'

const db: string = process.env.POSTGRES_DATABASE || ''
const user: string = process.env.POSTGRES_DATABASE_USER || ''
const password: string = process.env.POSTGRES_DATABASE_PASSWORD || ''

const sequelize = new Sequelize(db, user, password, { dialect: 'postgres', logging: false })

const models: { [key: string]: any } = {
	User: sequelize.import('./user'),
	Message: sequelize.import('./message')
}

Object.keys(models).forEach(key => {
	if ('associate' in models[key]) {
		models[key].associate(models)
	}
})

export { sequelize }
export default models
