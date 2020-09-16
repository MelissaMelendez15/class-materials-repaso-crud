const express = require('express')
const router = express.Router()

//Models
const Park = require('./../models/park.model')
const Coaster = require('./../models/coaster.model')

//Park Endpoints
router.get('/new', (req, res) => res.render('parks/new-park'))

router.post('/new', (req, res) => {
    const { name, description } = req.body
    Park
        .create({ name, description })
        .then(res.render('parks/new-park'))
        .catch(err => console.log)
})

module.exports = router