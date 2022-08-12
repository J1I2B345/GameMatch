var chat = []

function joinChat(user){
    if (chat.length) {chat = chat.filter(e => e._id !== user._id)}
    chat.push(user)
   
}

function leaveChat(_id){

    if (chat.length){ chat = chat.filter(e => e._id !== _id)}
    console.log('chat después de que se fue el usuario', _id, chat)
    return chat
}


function getUser(_id){
    return chat.find(e => e._id === _id)
}



module.exports = {
    joinChat, leaveChat, getUser
}
