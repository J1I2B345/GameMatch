const { Router } = require("express");
const router = Router();
const axios = require("axios");
const GameSchema = require("../models/Games");

//*----------------GET GAMES------------------------

router.get("/", (req, res) => {
  try {
    GameSchema.find().then((games) => {
      res.json(games);
    });
  } catch (error) {
    console.log(error);
    console.log("error trying to get games");
  }
});
//*----------------POST GAMES------------------------
router.post("/", (req, res) => {
  const { name, image, category } = req.body;
  try {
    const game = GameSchema(name, image, category);
    game;
    game
      .find(name)
      .save()
      .then((data) => res.json(data));
  } catch (error) {
    console.log(error);
  }
});

//*----------------UPDATE GAMES------------------------

router.put("/:id", async (req, res) => {
  try {
    GameSchema.findOneAndUpdate({ _id: req.params.id }, req.body).then(
      function (gameUpdate) {
        GameSchema.findOne({ _id: req.params.id }).then(function (gameUpdate) {
          res.send(gameUpdate);
        });
      }
    );
  } catch (error) {
    console.log(error);
    console.log("error trying to update game");
  }
});


//*----------------DELETE GAMES------------------------

router.delete('/:id',async(req, res)=>{
    try {
        GameSchema.findOneAndDelete({_id: req.params.id}).then(function(student){
            res.send(student);
        });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message:"Error occurred while deleting game"});
        }
    })



module.exports = router;
