const mysql = require('mysql2/promise')
const dbConfig = require('../config/db')

const getMovies = async (req, res) => {
	try{
		const connection = await mysql.createConnection(dbConfig)
		const [rows] = await connection.execute('SELECT id, title, description, year FROM movies ORDER BY created_at DESC')
		res.json(rows)
	} catch(err){
		res.status(500).send('Error al obtener las películas')
	}
}

const getMovie = async (req, res) => {
	try {
		const connection = await mysql.createConnection(dbConfig)
		const [rows] = await connection.execute(`SELECT id, title, description, year FROM movies WHERE id = ${req.params.id}`)
		res.json(rows)
	} catch (err) {
		console.log('error', err)
	}
}

module.exports = {
	getMovies,
	getMovie
}