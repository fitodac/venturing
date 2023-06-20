const express = require('express')
const moviesRoutes = require('./movies.router')
const authRoutes = require('./auth.router')
const authenticateToken = require('../middlewares/validate-token')

function routerApi(app){
	const router = express.Router()
	app.use('/api/', router)
	router.use('/auth', authRoutes)
	router.use('/movies', authenticateToken, moviesRoutes)
}

module.exports = routerApi