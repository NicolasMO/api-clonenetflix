const express = require('express')
const router = express.Router()
const _ = require('underscore')
const Filme = require('../models/filme')
const Temporada = require('../models/temporada')

// Recuperar tela HOME
router.get('/home', async (req, res) => {
    try {
        // recuperando filmes
        let filmes = await Filme.find({})
        let finalFilmes = []

        // recuperando temporadas
        for (let filme of filmes) {
            const temporadas = await Temporada.find({
                filme_id: filme._id
            })

            const newFilme = { ...filme._doc, temporadas }
            finalFilmes.push(newFilme)
        }

        // misturar filmes aleatoriamente
        finalFilmes = _.shuffle(finalFilmes)

        // filme Principal
        const principal = finalFilmes[0]

        // separar em seções
        const secoes = _.chunk(finalFilmes, 5)

        res.json({ error: false, principal, secoes })

    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const filmes = await Filme.find({})
        res.json({ error: false, filmes })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const filme = await Filme.findById(id)
        res.json({ error: false, filme })

    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const filme = req.body
        const response = await new Filme(filme).save()
        res.json({ error: false, filme: response })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const novoFilme = req.body
        const filme = await Filme.findByIdAndUpdate(id, novoFilme)
        res.json({ error: false, filme })

    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const filme = await Filme.findByIdAndDelete(id)
        res.json({ error: false, filme })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})

module.exports = router