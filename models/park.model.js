const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parkSchema = new Schema({

    name: {
        type: String,
    },
    description: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    }
})

module.exports = mongoose.model('Park', parkSchema)