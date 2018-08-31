const server = require('http').createServer()
const io = require('socket.io')(server)
const emitter = require('./events')

require('./game')

io.on('connection', (socket) => {
    emitter.emit('player connected', socket.id)

    socket.on('player moved', (data) => {
        emitter.emit('player moved', data)
    })

    socket.on('disconnect', () => {
        emitter.emit('player disconnected', socket.id)
        socket.broadcast.emit('player disconnected', socket.id)
    })
})

emitter.on('gameObjects', (data) => {
    io.emit('gameObjects', data)
})

server.listen(3001)