var chat = []

function joinChat(_id){
    chat = chat.filter(e => e._id !== _id)
    chat.push(user)
}

function leaveChat(_id){
    chat = chat.filter(e => e._id !== _id)
    return chat
}



module.exports = {
    joinChat, leaveChat
}
