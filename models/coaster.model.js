const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coasterSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    inversions: {
        type: Number,
    },
    length: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: true
    },
    park: {
        type: Schema.Types.ObjectId,
        ref: 'Park'
    }
})

module.exports = mongoose.model('Coaster', coasterSchema)