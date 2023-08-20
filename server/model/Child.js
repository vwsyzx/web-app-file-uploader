const mongoose = require('mongoose')

const Child = new mongoose.Schema({
    childId: {type: String, required: true},
    current: {type: String, required: true},
    child: {type: Array, default: []}
})

module.exports = mongoose.model('Child', Child)