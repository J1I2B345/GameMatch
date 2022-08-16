const { Router } = require("express");
const router = Router();
const GameSchema = require("../models/Games");

//authentication methods
const jwt = require("jsonwebtoken");
const Role = require("../models/Role.js");
const auth = require("../middlewares/auth");
//*----------------GET ALL USER------------------------

//*----------------GET GAMES------------------------

//solicitud Tipo GET: localhost:3001/games

router.get("/", async (req, res) => {
	try {
		const games = await GameSchema.find();
		if (games) res.json(games);
		else throw new Error("No games");
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
		if (games) return res.json(games);
		else throw new Error("Game not found");
	} catch (error) {
		console.log("Error trying to get games");
		res.status(500).send({ error: error.message });
	}
});

//*----------------POST GAMES------------------------

//solicitud Tipo  POST: localhost:3001/games/id
//[auth.verifyToken,auth.isAdmin] auth.isAdmin,

router.post(
	"/",
	// auth.isAdmin,
	async (req, res) => {
		const { image, gender, elo, position, name } = req.body;

		try {
			const game = new GameSchema({
				name,
				image,
				gender,
				elo,
				position,
			});
			//console.log(typeof image);
			const savedGame = await game.save();
			if (game) res.status(201).json(savedGame);
			else throw new Error("the game already exists");
		} catch (error) {
			res.status(500).json({ error: error.message });
		}

	}
);

//*----------------UPDATE GAMES------------------------
//[auth.verifyToken,auth.isAdmin]auth.isAdmin,

router.put(
	"/:id",
	//  auth.isAdmin,
	async (req, res) => {
		//solicitud Tipo GET: localhost:3001/games/id

		try {
			const updateGame = await GameSchema.findByIdAndUpdate(
				{ _id: req.params.id },
				req.body,
				{ new: true }
			);
			res.status(201).json(updateGame);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}

	}
);

//*----------------DELETE GAMES------------------------

//solicitud Tipo DELETE: localhost:3001/games/id

//[auth.verifyToken,auth.isAdmin]auth.isAdmin,


router.delete(
	"/:id",
	// auth.isAdmin,
	async (req, res) => {
		try {
			const deleteGame = await GameSchema.findByIdAndDelete(
				{ _id: req.params.id },
				req.body
			);
			if (deleteGame) res.status(200).json(deleteGame);
			else throw new Error("There is no game with that _id");
		} catch (error) {
			res.status(500).json({ message: error.message });
		}

	}
);

module.exports = router;
