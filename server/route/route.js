const express = require('express')
const func = require('../func/file-func')

const route = express()

route.post('/upload', (req, res) => func.upload(req, res))
route.post('/folder', (req, res) => func.addFolder(req, res))
route.post('/rmfolder', (req, res) => func.removeFolder(req, res))
route.get('/getmain', (req, res) => func.getMainFolder(req, res))

module.exports = route