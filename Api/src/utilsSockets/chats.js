var chat = []

function joinChat(user){
    chat = chat.filter(e => e._id !== user_id)
    chat.push(user)
}

function leaveChat(_id){
    chat = chat.filter(e => e._id !== _id)
    return chat
}


function getUser(_id){
    return chat.find(e => e._id === _id)

}



module.exports = {
    joinChat, leaveChat, getUser
}
