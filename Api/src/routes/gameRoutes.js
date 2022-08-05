const { Router } = require("express");
const router = Router();
const GameSchema = require("../models/Games");

//*----------------GET GAMES------------------------

//solicitud Tipo GET: localhost:3001/games

router.get("/", async (req, res) => {
  try {
    const games = await GameSchema.find();
    res.json(games);
  } catch (error) {
    console.log("Error trying to get games");
    res.status(400).send({ error: error.message });
  }
});

//*----------------GET GAMES/:ID------------------------

//solicitud Tipo GET: localhost:3001/games/id

router.get("/:id", async (req, res) => {
  try {
    const games = await GameSchema.findById(req.params.id);
    res.json(games);
  } catch (error) {
    console.log("Error trying to get games");
    res.status(500).send({ error: error.message });
  }
});

//*----------------POST GAMES------------------------

//solicitud Tipo  POST: localhost:3001/games/id

router.post("/", async (req, res) => {
  const { name, image, gender, elo, position } = req.body;
  try {
    const game = await GameSchema.create({
      name,
      image,
      gender,
      elo,
      position,
    });
    console.log('POST ' + game.name)
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//*----------------UPDATE GAMES------------------------

router.put("/:id", async (req, res) => {

  //solicitud Tipo GET: localhost:3001/games/id

  try {
    const updateGame = await GameSchema.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(201).json('the game was succesfully modified');
  } catch (error) {
    console.log("Error trying to update game");
    res.status(500).json({ error: error.message });
  }
});

//*----------------DELETE GAMES------------------------

 //solicitud Tipo DELETE: localhost:3001/games/id

router.delete("/:id", async (req, res) => {
  try {

    const deleteGame = await GameSchema.findOneAndDelete({ _id: req.params.id }, req.body);
    console.log('DELETED ' + deleteGame.name)
    res.status(200).json(deleteGame);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
