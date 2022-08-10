const usersLol = []
const usersCS = []
const usersR6 = []

//join user to chat


function userJoin(user){
     
    if (user.game === "League of Legends")    
    usersLol.push(user)

    if (user.game === "Tom Clancy's Rainbow Six Siege")    
    usersR6.push(user)

    if (user.game === "Counter-Strike: Global Offensive")    
    usersCS.push(user)

    return user
}

function getRoomUsers(game){
    if (game === "League of Legends")    
    return usersLol

    if (game === "Tom Clancy's Rainbow Six Siege")    
    return usersR6

    if (game === "Counter-Strike: Global Offensive")    
    return usersCS
}

module.exports = {
    userJoin, getRoomUsers
}