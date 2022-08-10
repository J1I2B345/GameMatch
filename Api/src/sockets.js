module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('conectado', socket.id)

        socket.on ('joinRoom', (user)=>{
            console.log({...user, socketid: socket.id})
        })
        socket.on('disconnect', () =>{
            console.log('desconectado, ', socket.id)
        })
        
    }
    
   
    
    )
}