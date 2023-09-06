const express = require("express")
const router = require("./router")
const cors = require("cors")
const { initDatabase } = require("./db.js")

const app = express()
const db = initDatabase()

app.use(cors())
app.use(express.json()) //configurando a API para trabalhar com dados JSON
app.use(router)

module.exports = {
  app,
  db
} //exportando o app
