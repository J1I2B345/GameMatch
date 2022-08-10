const usersLol = []
const usersCS = []
const usersR6 = []

//join user to chat


function userJoin(user){
    if (user.game === "League of Legends"){
        let userExist = usersLol.filter(e => e._id === user._id)
        if (userExist.length) return false
        else usersLol.push(user)
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