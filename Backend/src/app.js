const express = require("express")
const router = require("./router")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json()) //configurando a API para trabalhar com dados JSON
app.use(router)

module.exports = app //exportando o app
