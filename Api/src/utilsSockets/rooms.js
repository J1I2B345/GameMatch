const usersLol = []
const usersCS = []
const usersR6 = []

//join user to chat


function userJoin(user){
     console.log ('back', user)
    if (user.game === "League of Legends"){
        let userExist = usersLol.filter(e => e._id !== user._id)
        if (userExist.length) return false
        else usersLol.push(user)
    }    
   

    if (user.game === "Tom Clancy's Rainbow Six Siege"){
        let userExist = usersR6.filter(e => e._id !== user._id)
        if (userExist.length) return false
        else usersR6.push(user)
    }    

    if (user.game === "Counter-Strike: Global Offensive"){
        let userExist = usersCS.filter(e => e._id !== user._id)
        if (userExist.length) return false
        else usersCS.push(user)
    }    
    return user
}

function getGameUsers(game){
    if (game === "League of Legends") {
        console.log(usersLol)   
        return usersLol
    }

    if (game === "Tom Clancy's Rainbow Six Siege")    
    return usersR6

    if (game === "Counter-Strike: Global Offensive")    
    return usersCS
}

module.exports = {
    userJoin, getGameUsers
}