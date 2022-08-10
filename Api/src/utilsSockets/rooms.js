const usersLol = []
const usersCS = []
const usersR6 = []

//join user to chat


function userJoin(user){
    console.log(user)
    if (user.game === "League of Legends"){
        console.log("pre: ", usersLol)
        let userExist = usersLol.filter(e => e._id === user._id)
        if (userExist.length) return false
        else usersLol.push(user)
        console.log ("post: ", usersLol)
    }      

    if (user.game === "Tom Clancy's Rainbow Six Siege"){
        let userExist = usersR6.filter(e => e._id === user._id)
        if (userExist.length) return false
        else usersR6.push(user)
    }    

    if (user.game === "Counter-Strike: Global Offensive"){
        let userExist = usersCS.filter(e => e._id === user._id)
        if (userExist.length) return false
        else usersCS.push(user)
    }    
    return user
}

function getGameUsers(game, id){
    if (game === "League of Legends") { 
        return usersLol.filter(e=> e._id !==id)
    }

    if (game === "Tom Clancy's Rainbow Six Siege")    
    return usersR6.filter(e=> e._id !==id)

    if (game === "Counter-Strike: Global Offensive")    
    return usersCS.filter(e=> e._id !==id)
}

function leaveRoom(game, id){
   
    if (game === "League of Legends") { 
        console.log('pre.. game: ', game, 'id: ', id, 'users: ', usersLol)
        const index = usersLol .findIndex(user => user._id === id)
        if(index!== -1) {
            return usersLol.splice(index, 1)[0];
        }        
        
    }
    if (game === "Tom Clancy's Rainbow Six Siege")  {
        const index = usersR6.findIndex(user => user._id === id)
        if(index!== -1) {
            return usersR6.splice(index, 1)[0];
        }   
    } 

    if (game === "Counter-Strike: Global Offensive"){
        const index = usersCS.findIndex(user => user._id === id)
        if(index!== -1) {
            return usersCS.splice(index, 1)[0];
        }
        
    }  
    console.log('post: ', usersLol)
}

function getUser(socketid){
    let userLol = usersLol.find(e => e.socketid === socketid)
    let userCS = usersCS.find( e=> e.socketid === socketid)
    let userR6 = usersR6.find( e=> e.socketid === socketid)
}

module.exports = {
    userJoin, getGameUsers, leaveRoom
}