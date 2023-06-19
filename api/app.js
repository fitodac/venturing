const { app } = require('./server.js')
require('dotenv').config()
const mysql = require('mysql2/promise')
const dbConfig = require('./config/db')
const port = process.env.API_PORT || 3000

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})

async function startServer() {
  try {
    const connection = await mysql.createConnection(dbConfig)
    // ...
  } catch (err) {
    console.error('Error de conexión a la base de datos: ', err)
    // ...
  }
}

startServer()