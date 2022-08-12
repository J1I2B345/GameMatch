const {userJoin, getGameUsers, leaveRoom} = require('./utilsSockets/rooms')


module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('joinRoom', (user)=>{
            if(user.username){
            let userFull = {...user, socketid: socket.id}
            global[socket.id] = userFull
            userJoin(userFull)
            socket.join(userFull.game)
            socket.emit('socketid', socket.id)
            // socket.broadcast.to(userFull.game).emit('message', `${userFull.username} has joined the chat`)
            io.to(userFull.game).emit('gameUsers', getGameUsers(userFull.game))
        }
        })

        socket.on('disconnect', () =>{
            if(global[socket.id]){
                socket.broadcast.to(global[socket.id].game).emit('message', `${global[socket.id].username} has left the chat`)
                leaveRoom(global[socket.id].game, global[socket.id]._id)
                io.to(global[socket.id].game).emit('gameUsers', getGameUsers(global[socket.id].game))
                console.log('debería ser el objeto: ', global[socket.id])
                global[socket.id]= null
                delete global[socket.id]
                console.log('debería ser undefined:', global[socket.id])
            }
        })
    }
    
   
    
    )
}