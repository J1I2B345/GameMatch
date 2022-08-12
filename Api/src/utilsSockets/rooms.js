var usersLol = []
var usersCS = []
var usersR6 = []


function userJoin(user){
    if (user.game === "League of Legends"){
        usersLol = usersLol.filter(e => e._id !== user._id)
        usersLol.push(user)
    }      

    if (user.game === "Tom Clancy's Rainbow Six Siege"){
        usersR6 = usersR6.filter(e => e._id !== user._id)
        usersR6.push(user)
    }    

    if (user.game === "Counter-Strike: Global Offensive"){
        usersCS = usersCS.filter(e => e._id === user._id)
        usersCS.push(user)
    }    
    return user
}

function getGameUsers(game){
    console.log ('cuando va a mandar los users', game, usersLol)
    if (game === "League of Legends") {
        return usersLol        
    }

    if (game === "Tom Clancy's Rainbow Six Siege"){
        return usersR6 
    }    

    if (game === "Counter-Strike: Global Offensive"){
        return usersCS
    }    
    
}

function leaveRoom(game, id){
   
    if (game === "League of Legends") { 
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
}



module.exports = {
    userJoin, getGameUsers, leaveRoom
}