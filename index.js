const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const database = require('./src/services/database')

const filmeRoutes = require('./src/routes/main.routes')
const usuarioRoutes = require('./src/routes/usuarios.routes')
const episodiosRoutes = require('./src/routes/episodios.routes')

const port = process.env.PORT || 8000

// Middlewares
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

// Routes
app.use('/', filmeRoutes)
app.use('/usuarios', usuarioRoutes)
app.use('/episodio', episodiosRoutes)

app.listen(8000, () => {
    console.log("Servidor funcionando!")
})