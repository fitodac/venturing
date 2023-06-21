const { app } = require('./server.js')
require('dotenv').config()
const port = process.env.API_PORT || 3000

app.listen(port, '0.0.0.0', () => {
	console.log(`http://localhost:${port}`)
})