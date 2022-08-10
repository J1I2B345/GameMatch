const {userJoin, getGameUsers, leaveRoom} = require('./utilsSockets/rooms')


module.exports = (io) => {
    var user
    io.on('connection', (socket) => {
        console.log('conectado', socket.id)

        socket.on('joinRoom', (user)=>{
            if(user.username){
            let userFull = {...user, socketid: socket.id}
            user = userFull
            userJoin(userFull)
            socket.join(userFull.game)
            socket.broadcast.to(userFull.game).emit('message', `${userFull.username} has joined the chat`)

            let users = getGameUsers(userFull.game, userFull._id)
            console.log('usuarios que estan en la sala: ', users)
            io.to(userFull.game).emit('gameUsers', getGameUsers(userFull.game, userFull._id))
        }
        })

        socket.on('disconnect', () =>{
            console.log(user)
            console.log(`${socket.id} left the room`)
            
            // leaveRoom( userFull.game, userFull._id)
        })
        
    }
    
   
    
    )
}