const mongoose = require('mongoose')

const File = new mongoose.Schema({
    root: {type: String, required: true},
    parent: {type: String, required: true},
    current: {type: String, required: true}
})