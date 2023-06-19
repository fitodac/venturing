const express = require('express')
const routerApi = require('./routes')
const app = express()
const { MODE, CLIENT_PORT } = process.env

app.use(express.json())

app.use((req, res, next) => {
	if('development' === MODE){
		res.header('Access-Control-Allow-Origin', `http://localhost:${CLIENT_PORT}`)
	}else{
		// res.header('Access-Control-Allow-Origin', 'https://pokemon-app-fitodac.vercel.app')
	}
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
	next()
})

routerApi(app)
module.exports = { app }