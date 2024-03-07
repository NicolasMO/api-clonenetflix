const database = require('../services/database')
const Filmes = require('../models/filme')
const Temporada = require('../models/temporada')
const Episodio = require('../models/episodio')

const addTemporadaEpisodios = async () => {
    try {
        const series = await Filmes.find({ tipo: 'serie' }).select('_id')
        for (let serie of series) {
            console.log(`FILME ----- ${serie}`)
            const numTemporadas = Math.floor(Math.random() * 5) + 1
            for (let i = 1; i <= numTemporadas; i++) {
                console.log(`Inserindo temporada ${i} de ${numTemporadas} temporadas`)
                const temporada = await new Temporada({
                    filme_id: serie,
                    titulo: `Temporada ${i}`
                }).save()

                const numEpisodios = Math.floor(Math.random() * 5) + 1
                for (let x = 1; x <= numEpisodios; x++) {
                    console.log(`Inserindo Episódio ${x} de ${numEpisodios} Episódios`)
                    await new Episodio({
                        temporada_id: temporada._id,
                        titulo: `Episódio ${x}`,
                        numero: x,
                        descricao: 'tellus at urna condimentum mattis pellentesque id nibh tortor id',
                        capa: 'https://picsum.photos/300/200'
                    }).save()
                }
            }
        }
        console.log('Finalizado!')
    } catch (err) {
        console.log(err.message)
    }
}

addTemporadaEpisodios()