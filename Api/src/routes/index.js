const { Router } = require('express');
const fetch = require('node-fetch')


const router = Router()


router.get ('/characters', async (req, res) =>{
    let response = await fetch('https://rickandmortyapi.com/api/character/1,2,3,4').then(data=> data.json()).then(data => data.map(e=> {return {id: e.id, name: e.name, status: e.status, image: e.image}}))
    res.send(response)
})


module.exports = router;