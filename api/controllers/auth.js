const jwt = require('jsonwebtoken')
require('dotenv').config()


const login = async (req, res) => {
	if( !req.body.username ) return res.status(401).json({ errors: { username: "Debes decirme tu nombre de usuario" } })
	if( req.body.username !== process.env.USERNAME ) return res.status(401).json({ errors: { username: "El nombre de usuario no es correcto" } })
	if( !req.body.password ) return res.status(401).json({ errors: { password: "Haz olvidado escribir la contraseña" } })
	if( req.body.password !== process.env.PASSWORD ) return res.status(401).json({ errors: { password: "La contraseña no es correcta" } })

	let user = { username: req.body.username }
	const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
	res.header('auth-token', token).json({ access_token: token })
}


module.exports = { login }