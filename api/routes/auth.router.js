const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { 
	login
} = require('../controllers/auth')

router.post('/', login)

module.exports = router