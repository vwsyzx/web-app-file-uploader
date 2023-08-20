const express = require('express')
const http = require('http')
const ws = require('ws')
const cors = require('cors')
const app = express()
const fileUpload = require('express-fileupload')
const route = require('./route/route')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static('static'))

app.use('/api', route)

const server = http.createServer(app)
const wss = new ws.Server({server})


async function start(){
    try {
        await mongoose.connect('mongodb+srv://islom:islom2006@cluster0.xwhqibk.mongodb.net/?retryWrites=true&w=majority')
        server.listen(3500, () => console.log('server started on post: 3500'))
    } catch (error) {
        console.log(error)
    }
}
start()