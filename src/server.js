import app from './app.js'
import dotenv from 'dotenv'

dotenv.config() // importando dessa maneira a biblioteca fica disponível nos outros arquivos

const PORT = process.env.PORT || 3333 // se a variável de ambiente PORT não existir, a porta padrão será 3333

// iniciando o servidor
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT} 🚀`)
})
