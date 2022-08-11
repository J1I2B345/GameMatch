const {Router} = require("express")
const router = Router()
const Chat = require("../models/Chats.js")
const User = require("../models/Users.js")
const mongoose = require("mongoose");





// get all chats. used for testing and keep track of mocked data
router.get('/all', async(req,res)=>{
    try{
        let chats = await Chat.find()
        res.json(chats)    
    }catch(e){
        res.status(400).json({"error": e.message})
    }
})


//get users who you can talk to

router.get('/getUsersToChat/:_id', async (req, res)=>{
    let {_id} = req.params
    try{
    let user = await User.aggregate([
       
       
        {$lookup: { 
            from: "users",
            localField: "chats",
            foreignField: "_id",
            as: "usersToChat"
          }
        },
        {
            $match: {
                _id:  mongoose.Types.ObjectId(_id)
            }}
    ])
        let chats = user[0].usersToChat.map(e=> {return {_id: e._id, username: e.username, rating: e.rating}})
        if(chats.length) return res.send(chats)
        else throw new Error ('no friends to chat')
    }catch(e){
        res.status(400).send({"error": e.message})
    }

})



//get a chat from two users
// body = {
//     sender: _id,
//     receiver: _id, 
// }
router.get('/', async (req, res)=>{
   try{ 
    const {sender, receiver} = req.body
    const chats = await Chat
        .find({ 
            users:{
                $all: [sender, receiver]
            },
        })
        .sort ({ createdAt:1 })
        if (chats.length === 0) {
            throw new Error('No messages between users')
        } else return res.json(chats)

    } catch(e){
        res.status(400).json({"error": e.message})
    }
})
  





//save a message
// body = {
//     message: 'hey dude',
//     users: [_id1, _id2],
//     sender: _id1
// }

router.post('/', async(req, res)=>{
    try {
        const {message, users, sender} = req.body
        if (users[0] === users[1]) throw new Error('sender and receiver must be two differents users')
        if (sender !== users[0] && sender!== users[1]) throw new Error ('sender must be one of the users in this chat')
        const chat = {message, users, sender} 
        const chatSaved = await Chat.create(chat)
    
        if (chatSaved) {
            const addUser1ToChatOfUser0 = await User.findByIdAndUpdate(users[0], {
                $addToSet: {chats: users[1]}}, {new:true})
            
            const addUser0ToChatOfUser1= await User.findByIdAndUpdate(users[1], {
                $addToSet: {chats: users[0]}}, {new:true})
              
            res.status(201).send('Message send')
        }
    } catch(e){
        res.status(400).json({"error": e.message})
    }
})




//add users to the property chats of the other => would be useful when the match is done
/// body : "users" : ["_id1", "_id2"]
router.post('/addUserToChat', async(req,res)=>{
    try {
        const {users} = req.body
        
        const addUser1ToChatOfUser0 = await User.findByIdAndUpdate(users[0], {
            $addToSet: {chats: users[1]}})    
        
        const addUser0ToChatOfUser1= await User.findByIdAndUpdate(users[1], {
            $addToSet: {chats: users[0]}})
        
        res.send('The users can now chat')   
    } catch(e){
        res.status(400).json({"error": e.message})
    }
})

// delete a message
router.delete('/message/:id', async(req, res) =>{
    try{
        let messageDeleted = await Chat.findByIdAndRemove(req.params.id)
        if (messageDeleted) return res.json({message: 'message succesfully deleted', item: messageDeleted})
        else throw new Error('message not deleted -probably couldnt be found because it was already deleted, try another-')
    }catch(e){
        res.status(400).json({"error": e.message})

    }
})

// delete full chat of two users
// body = {
//     users: [_id1, _id2]
// }
router.delete('/users', async(req, res) =>{
    try{
        const users=req.body.users        
        if (users.length!==2 ) throw new Error ('must enter two users')
        if (users[0] === users[1]) throw new Error ('insert two differents users')
        let chatDeleted = await Chat.deleteMany({users})

        if (chatDeleted.deletedCount > 0) {
            let chatUser0 = await User.findByIdAndUpdate(users[0],{
                $pull: {chats: users[1]}
            })
            let chatUser1 = await User.findByIdAndUpdate(users[1],{
                $pull: {chats: users[0]}
            })
            return res.json({message: `chat succesfully deleted ${chatDeleted.deletedCount}`})
        } else {
            throw new Error('chat not deleted')
        }    
    }catch(e){
        res.status(400).json({"error": e.message})
    }
})


module.exports = router