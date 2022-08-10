const {userJoin, getGameUsers} = require('./utilsSockets/rooms')


module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('conectado', socket.id)

        socket.on('joinRoom', (user)=>{
            let userFull = {...user, socketid: socket.id}
            userJoin(userFull)
            socket.join(userFull.game)
            socket.broadcast.to(userFull.game).emit('message', `${userFull.username} has joined the chat`)

            
            io.to(userFull.game).emit('gameUsers', getGameUsers(userFull.game))
        })

        socket.on('disconnect', () =>{
            console.log('desconectado, ', socket.id)
        })
        
    }
    
   
    
    )
}