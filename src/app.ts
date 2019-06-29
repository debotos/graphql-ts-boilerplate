import express = require('express')
// To handle 'Unhandled promise rejections' error that caused by async/await inside route handler
require('express-async-errors')
import * as bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'

import setupRESTfulRoutes from './routes'

class App {
	public app: express.Application
	public mongoURI: string = 'mongodb://localhost/graphql-ts-boilerplate'

	constructor() {
		this.app = express()
		this.config() // middleware & other configuration
		this.setupDB() // Database
		this.setupRoutes() // Routes
	}

	private setupRoutes(): void {
		setupRESTfulRoutes(this.app)
	}

	private config(): void {
		// set ENV variables
		dotenv.config()
		// set PORT
		this.app.set('port', process.env.PORT || 5000)
		// cross-origin request
		this.app.use(cors())
		// request log
		this.app.use(morgan('tiny'))
		// support application/json type post data
		this.app.use(bodyParser.json())
		// support application/x-www-form-urlencoded post data
		this.app.use(bodyParser.urlencoded({ extended: false }))
		// compression and to secure the endpoint
		this.app.use(compression())
		this.app.use(helmet())
		// Handle The unhandledRejection Event
		process.on('unhandledRejection', error => {
			console.log(` ❎  Error: unhandledRejection => `, error)
		})
	}

	private setupDB(): void {
		mongoose
			.connect(this.mongoURI, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useFindAndModify: false
			})
			.then(() => console.log(` ✔  Connected to MongoDB`))
			.catch((error: any) => console.error(` ❎  Error: Unable to connect MongoDB!`, error))
	}
}

export default new App().app
