const {joinUser} = require('./utilsSockets/rooms')


module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('conectado', socket.id)

        socket.on ('joinRoom', (user)=>{
            let userFull = {...user, socketid: socket.id}
            joinUser(userFull)
            socket.join(userFull.game)
            socket.broadcast.to(userFull.game).emit('message', `${userFull.username} has joined the chat`)
        })

        socket.on('disconnect', () =>{
            console.log('desconectado, ', socket.id)
        })
        
    }
    
   
    
    )
}