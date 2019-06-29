import app from './app'

const PORT: Number = app.get('port')

app.listen(PORT, () => {
	console.log(` 🚀  Server is up on port ${PORT}`)
})
