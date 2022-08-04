const {Router} = require("express")
const router = Router()
const News = require("../models/News.js")


router.get('/', async(req,res) =>{
    try{
        const news = await News.find()
        if (news) return res.json(news)
        else throw new Error('there is no news yet')
    } catch(e){
        res.status(400).json({"error": e.message})

    }
})

router.post('/', async(req, res)=>{
    try {
        if (req.body.editedBy) throw new Error(`edit user should be added just to update a news`)
        const {title, description, author} = req.body

        if (!title || !description ||!author) throw new Error ('enter title, description and author')
        if (title){ if (!title.trim()) throw new Error('enter a valid title')}
        if (description){ if (!description.trim()) throw new Error('enter a valid description')}
        if (author){ if (!author.trim()) throw new Error('enter a valid author')}
        const news = {title, description, author} 
        const newsSaved = await News.create(news)
        if (newsSaved) res.status(201).send('News created')
        else throw new Error('error creating the news')
    } catch(e){
        res.status(400).json({"error": e.message})
    }
})

router.delete('/delete/:id', async(req, res) =>{
    try{
        const messageDeleted = await News.findByIdAndDelete(req.params.id)
        if (messageDeleted) res.json({message: 'message deleted', messageDeleted})
        else throw new Error('message not deleted')
    } catch(e){
        res.status(400).json(e.message)
    }
})

router.put('/edit', async (req, res)=>{
    try{
        const {_id, title, description, editedBy} = req.body
        if ((!_id || !description || !editedBy) && (!_id || !title || !editedBy)) 
            throw new Error('enter _id, title or description of the news and the user who edits')
        if (description || title){
            if (title){
                if (!title.trim()) throw new Error ('enter a valid title')
            }
            if(description){
                if (!description.trim()) throw new Error ('enter a valid description')
            }
            
        }
        
        let updatedNew = {editedBy: editedBy}
        if (title) updatedNew.title= title
        if(description) updatedNew.description = description
        const messageUpdated = await News.findByIdAndUpdate(_id, updatedNew)
        if (messageUpdated) res.json({message: 'message updated', messageUpdated})
        else throw new Error('message not updated')
    } catch(e){
        res.status(400).json(e.message)
    }
})


module.exports = router