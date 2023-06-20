const mysql = require('mysql2/promise')
const dbConfig = require('../config/db')
const csv = require('csv-parser')
const fs = require('fs')

const uploadCSV = async (req, res) => {
	const file = req.file
	const results = []

	if( !file ) return res.status(400).json({
		error: true,
		message: 'No se ha subido ningún archivo'
	})

	try {
		const connection = await mysql.createConnection(dbConfig)

		fs.createReadStream(file.path, { encoding: 'utf-8' })
			.pipe(csv({ separator: ';', headers: false }))
			.on('data', data => {
				if( !results.find(e => e.title === data[0]) ) results.push({
																												title: data[0],
																												description: data[1],
																												year: data[2]
																											})
				
			})
			.on('end', async () => {
				const [rows] = await connection.execute('SELECT LOWER(title) AS title FROM movies')

				try {
					const values = results.map(e => {
						if( !rows.find(m => m.title === e.title.toLowerCase()) ) return [e.title, e.description, e.year]
					})

					const to_store = values.filter(e => e !== undefined)

					if( !to_store.length ){
						return res.status(200).json({
							error: true,
							message: 'Todas las películas ya existen en la base de datos'
						})
					}
					

					await connection.query('INSERT INTO movies (title, description, year) VALUES ?', [values.filter(e => e !== undefined)])

					res.send('Datos guardados correctamente')
				} catch (err) {
					console.error('Error al guardar los datos en la base de datos: ', err)
					res.status(500).send('Error interno del servidor')
				} finally {
					connection.end()
				}
			})
	} catch (err) {
		console.error('Error de conexión a la base de datos: ', err)
		res.status(500).send('Error interno del servidor')
	}
}

module.exports = uploadCSV