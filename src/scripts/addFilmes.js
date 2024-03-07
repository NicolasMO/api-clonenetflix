const database = require('../services/database')
const Filmes = require('../models/filme')
const filmesJSON = require('../data/filme.json')

const addFilmes = async () => {
    try {
        for (let filme of filmesJSON) {
            console.log(`Inserindo filme: ${filme.titulo}`)
            await new Filmes(filme).save()
        }
        console.log('Finalizado!')
    } catch (err) {
        console.log(err.message)
    }
}

addFilmes()