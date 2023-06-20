const express = require('express')
const routerApi = require('./routes')
const app = express()
const { MODE, CLIENT_PORT } = process.env
const cors = require('cors')

app.use(express.json())
app.use(cors({
	origin: `http://localhost:${CLIENT_PORT}`,
	// origin: '*',
	optionsSuccessStatus: 200
}))

routerApi(app)
module.exports = { app }