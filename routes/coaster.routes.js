const express = require('express')
const router = express.Router()

//Models
const Park = require('./../models/park.model')
const Coaster = require('./../models/coaster.model')

// Coaster endpoints
router.get('/', (req, res) => {
    Coaster
        .find()
        .populate('park')
        .then(allCoasters => {
            res.render('coasters/coasters-index', { allCoasters })
        })
        .catch(err => console.log('Error al acceder a la vista de montañas rusas: ', err))
})

router.get('/new', (req, res) => {
    Park
        .find()
        .then(allParks => res.render('coasters/new-coaster', { allParks }))
        .catch(err => console.log('Error al acceder al formulario: ', err))
})

router.post('/new', (req, res) => {
    const { name, description, inversions, length, park } = req.body

    Coaster
        .create({ name, description, inversions, length, park })
        .then(res.render('coasters/new-coaster'))
        .catch(err => console.log('Error al crear la montaña rusa: ', err))
})

router.get('/edit', (req, res) => {
    Promise
        .all([Coaster.findById(req.query.id).populate('park'), Park.find()])
        .then(data => res.render('coasters/edit-coaster', { coaster: data[0], allParks: data[1] }))
})

router.post('/edit', (req, res) => {
    const { name, description, inversions, length, park } = req.body

    Coaster
        .findByIdAndUpdate(req.query.id, { name, description, inversions, length, park }, { new: true })
        .then(res.redirect('/coasters'))
        .catch(err => console.log('Error al editar la montaña rusa: ', err))
})

router.get('/delete', (req, res) => {
    Coaster
        .findByIdAndDelete(req.query.id)
        .then(res.redirect('/coasters'))
        .catch(err => console.log('Error al eliminar la montaña rusa: ', err))
})

router.get('/:id', (req, res) => {
    Coaster
        .findById(req.params.id)
        .populate('park')
        .then(theCoaster => res.render('coasters/coaster-details', theCoaster))
        .catch(err => console.log('Error al acceder a los datos de la montaña rusa: ', err))
})

module.exports = router