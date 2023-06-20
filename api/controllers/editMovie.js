const mysql = require('mysql2/promise')
const dbConfig = require('../config/db')

const editMovie = async (req, res) => {
	const { title, description, year } = req.body

	if( !title || !description ){
		res.status(200).json({
			errors: {
				title: '¡No puedes dejar la película sin un título!',
				description: 'Mmm... parece que has olvidado la descripción'
			}
		})
		return
	}

	try {
		const connection = await mysql.createConnection(dbConfig)
		await connection.execute('UPDATE movies SET title = ?, description = ?, year = ? WHERE id = ?', [title, description, year, req.params.id])
		res.status(200).json({
			errors: false,
			message: 'WooHoo! he guardado tus cambios'
		})
	} catch (err) {
		res.status(401).send('No he podido crear la película')
	}
}

module.exports = editMovie