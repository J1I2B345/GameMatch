const {userJoin, getGameUsers, leaveRoom} = require('./utilsSockets/rooms')


module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('conectado', socket.id)

        socket.on('joinRoom', (user)=>{
            if(user.username){
            let userFull = {...user, socketid: socket.id}
            global[socket.id] = userFull
            userJoin(userFull)
            socket.join(userFull.game)
            socket.broadcast.to(userFull.game).emit('message', `${userFull.username} has joined the chat`)
            let users = getGameUsers(userFull.game, userFull._id)
            console.log('usuarios que estan en la sala: ', users)
            io.to(userFull.game).emit('gameUsers', getGameUsers(userFull.game, userFull._id))
        }
        })

        socket.on('disconnect', () =>{
           console.log (global[socket.id])
            
            console.log(`${socket.id} left the room`)
            // leaveRoom( user.game, user._id)
        })
        
    }
    
   
    
    )
}