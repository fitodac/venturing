const mysql = require('mysql2/promise')
const dbConfig = require('../config/db')

const deleteMovie = async (req, res) => {

	if( !req.params.id ){
		res.status(400).json({
			errors: {
				delete: 'Se ha producido un error al eliminar esta película'
			}
		})
		return
	}

	try {
		const connection = await mysql.createConnection(dbConfig)
		await connection.execute('DELETE FROM movies WHERE id = ?', [req.params.id])
		res.status(200).json({
			errors: false,
			message: 'Bueno, ye he eliminado la película'
		})
	} catch (err) {
		res.status(401).send('Lo siento, no he podido eliminar esta película')
	}
}

module.exports = deleteMovie