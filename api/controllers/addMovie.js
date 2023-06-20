const mysql = require('mysql2/promise')
const dbConfig = require('../config/db')

const addMovie = async (req, res) => {
	const { title, description, year } = req.body

	if( !title || !description ){
		res.status(200).json({
			errors: {
				title: 'Has olvidado decir cómo se llama la película',
				description: 'Ups! Necesito una descripción... aunque sea una breve'
			}
		})
		return
	}

	try {
		const connection = await mysql.createConnection(dbConfig)
		const [rows] = await connection.execute('SELECT id FROM movies WHERE LOWER(title) = ?', [title.toLowerCase()])

		if( rows.length > 0 ){
			res.status(200).json({
				errors: {
					title: 'Esta película ya existe'
				}
			})
			return
		}

		await connection.execute('INSERT INTO movies (title, description, year) VALUES (?, ?, ?)', [title, description, year])
		res.status(201).json({
			errors: false,
			message: '¡Ya he guardado la película!'
		})
	} catch (err) {
		res.status(401).send('No he podido crear la película')
	}
}

module.exports = addMovie