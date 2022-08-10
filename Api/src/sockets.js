const {userJoin, getGameUsers, leaveRoom} = require('./utilsSockets/rooms')


module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('joinRoom', (user)=>{
            if(user.username){
            let userFull = {...user, socketid: socket.id}
            global[socket.id] = userFull
            userJoin(userFull)
            socket.join(userFull.game)
            socket.broadcast.to(userFull.game).emit('message', `${userFull.username} has joined the chat`)
            io.to(userFull.game).emit('gameUsers', getGameUsers(userFull.game, userFull._id))
        }
        })

        socket.on('disconnect', () =>{            
            leaveRoom( global[socket.id].game, global[socket.id]._id)
            io.to(global[socket.id].game).emit('gameUsers', getGameUsers(global[socket.id].game))
        })
        
    }
    
   
    
    )
}