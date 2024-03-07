const database = require('../services/database')

const Usuario = require('../models/usuario')
const usuarioJSON = require('../data/usuario.json')

const addUsers = async () => {
    try {
        for (let usuario of usuarioJSON) {
            console.log(`Inserindo usuario ${usuario.nome}`)
            await new Usuario(usuario).save()
        }
        console.log("Inserção finalizada!")
    } catch (err) {
        console.log(err.message)
    }
}

addUsers();