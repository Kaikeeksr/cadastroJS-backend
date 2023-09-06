//configurando a conexão com o banco de dados SQL
const mysql = require("mysql2/promise")
require("dotenv").config()

const initDatabase = () => {
  try {
    const connection = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB
    })

    return connection
  } catch (error) {
    const message = error.message || "An unknown error occured"
    throw new Error(message)
  }
}

module.exports = {
  initDatabase
}
