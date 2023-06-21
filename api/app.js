const { app } = require('./server.js')
require('dotenv').config()
const port = process.env.API_PORT || 3000

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})

app.get('/', (req, res) => res.status(200).send('Hola API'))