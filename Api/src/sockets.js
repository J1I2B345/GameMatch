const {userJoin, getGameUsers, leaveRoom} = require('./utilsSockets/rooms')


module.exports = (io) => {
    io.on('connection', (socket) => {   
        console.log('conectado', socket.id)     
        
        //funcionalidad sala y match
        socket.on('joinRoom', (user)=>{
            if(user.username){
            global[socket.id] = userFull
            userJoin(userFull)
            socket.join(userFull.game)
            io.to(userFull.game).emit('gameUsers', getGameUsers(userFull.game))
        }})

        //conectado al chat
        
        socket.on('client: chat message', msg => {
            console.log(msg)
            socket.emit('server: chat message', msg)
        })




        
        socket.on('disconnect', () =>{

            // functionalidad sala y match
            if(global[socket.id]){
                leaveRoom(global[socket.id].game, global[socket.id]._id)
                io.to(global[socket.id].game).emit('gameUsers', getGameUsers(global[socket.id].game))
                global[socket.id]= null
                delete global[socket.id] 
            }
        })
    }
    
   
    
    )
}