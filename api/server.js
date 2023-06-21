const express = require('express')
const routerApi = require('./routes')
const app = express()
const { CLIENT_URL } = process.env
const cors = require('cors')

app.use(express.json())
app.use(cors({
	origin: CLIENT_URL,
	// origin: '*',
	optionsSuccessStatus: 200
}))

routerApi(app)
module.exports = { app }