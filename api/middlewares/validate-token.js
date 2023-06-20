const jwt = require('jsonwebtoken')
require('dotenv').config()


const authenticateToken = (req, res, next) => {
	const token = req.header('auth-token')
	if( !token ) return res.status(401).json({ error: 'Acceso denegado' })
	try {
		const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		req.user = verified
		next()
	} catch (error) {
		res.status(400).json({error: 'El token no es válido'})
	}
}


module.exports = authenticateToken