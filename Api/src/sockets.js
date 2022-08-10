module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('conectado', socket.id)


        socket.on('disconnect', () =>{
            console.log('desconectado, ', socket.id)
        })
        
    }
    
   
    
    )
}