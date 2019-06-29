// To handle 'Unhandled promise rejections' error that caused by async/await inside route handler
require('express-async-errors')
import * as dotenv from 'dotenv'
// set ENV variables & Credentials
dotenv.config()
import app from './app'
import models, { sequelize } from './GraphQL/models'
import { createUsersWithMessages } from './GraphQL/loaders'

const PORT: Number = app.get('port')
/* Change it to false in time of production or to make the data stable */
const eraseDatabaseOnSync: boolean = false

/* seed the database on every application startup */
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
	if (eraseDatabaseOnSync) {
		createUsersWithMessages(models) /* Generate dummey or initial data */
	}
	app.listen(PORT, () => {
		console.log(` 🚀  RESTful Server is up on http://localhost:${PORT}`)
		console.log(` 🚀  GraphQL Server is on on http://localhost:${PORT}/graphql`)
		console.log(` ✔  Connected to Postgres Database`)
	})
})
