const server = require('http').createServer()
const dispatcher = require('./dispatcher')
server.listen('8000')
server.on('request', dispatcher)