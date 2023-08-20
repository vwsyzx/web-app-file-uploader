const mongoose = require('mongoose')

const Folder = new mongoose.Schema({
    root: {type: String, required: true},
    parent: {type: String, required: true},
    current: {type: String, required: true},
    childId: {type: String, required: true},
    type: {type: String, required: true}
})
module.exports = mongoose.model('Folder', Folder)