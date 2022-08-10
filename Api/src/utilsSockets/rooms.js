var usersLol = []
var usersCS = []
var usersR6 = []

//join user to chat


function userJoin(user){
    console.log('user que entra', user)
    if (user.game === "League of Legends"){
        console.log ('users en LOL pre joinear el user', usersLol)
        usersLol = usersLol.filter(e => e._id !== user._id)
        usersLol.push(user)
        console.log('users que hay luego del join', usersLol)
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

function getGameUsers(game, id){
    if (game === "League of Legends") {
        console.log('server: getusers, pre: ', usersLol)
        if(id) return usersLol.filter(e=> e._id !==id)
        else return usersLol
    }

    if (game === "Tom Clancy's Rainbow Six Siege"){
        if(id) return usersR6.filter(e=> e._id !==id)
        else return usersR6 
    }    

    if (game === "Counter-Strike: Global Offensive"){
        if(id) return usersCS.filter(e=> e._id !==id)
        else return usersCS
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