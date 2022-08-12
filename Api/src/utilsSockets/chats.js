var chat = []

function joinChat(user){
    console.log( 'chat antes de que se una el usuario', chat)
    if (chat.length) {chat = chat.filter(e => e._id !== user._id)}
    chat.push(user)
    console.log('chat después de que se una el usuario', chat)
}

function leaveChat(_id){

    if (chat.length){ chat = chat.filter(e => e._id !== _id)}
    console.log('chat después de que se fue el usuario', _id, chat)
    return chat
}


function getUser(_id){
    console.log('_id de usuario', chat)
    return chat.find(e => e._id === _id)

}



module.exports = {
    joinChat, leaveChat, getUser
}
