require('dotenv').config()
const serverExpress = require ('./src/app');
const connectDB = require ('./src/db');
const {Server} = require ("socket.io");
const http = require ('http');
const sockets = require ('./src/sockets')


// let httpServer
// let io
connectDB()

const server= http.createServer(serverExpress)
let httpServer = server.listen(process.env.PORT, () => {
    console.log('%s listening at ' + process.env.PORT); // eslint-disable-line no-console
});
let io = new Server(httpServer)
sockets(io)



    
