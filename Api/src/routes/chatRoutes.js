const {Router} = require("express")
const router = Router()
const Chat = require("../models/Chats.js")

// get all chats. used for testing and keep track of mocked data
router.get('/all', async(req,res)=>{
    try{
        let chats = await Chat.find()
        res.json(chats)    
    }catch(e){
        res.status(400).json({"error": e.message})
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
        if (chatSaved) res.status(201).send('Message send')
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
        let users=req.body.users        
        if (users.length!==2 ) throw new Error ('must enter two users')
        if (users[0] === users[1]) throw new Error ('insert two differents users')
        let chatDeleted = await Chat.deleteMany({users})
        if (chatDeleted.deletedCount > 0) {
            return res.json({message: `chat succesfully deleted ${chatDeleted.deletedCount}`})
        } else {
            throw new Error('chat not deleted')
        }    
    }catch(e){
        res.status(400).json({"error": e.message})
    }
})


module.exports = router