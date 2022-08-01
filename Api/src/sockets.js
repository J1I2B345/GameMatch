module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('conectado', socket.id)
    })
}