// configurando a conexão com o banco de dados SQL
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.MYSQL_HOST)

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
})

export default connection
