const { Router } = require("express");
const router = Router();

const UserSchema = require("../models/Users.js");
const mongoose = require("mongoose");

router.post("/", async (req, res, next) => {
	try {
		res.send("REGISTRATE CON POST");
	} catch {
		res.status(404).json({ message: error.message });
	}
});

router.post("/singIN", async (req, res, next) => {
	try {
		res.send("RENTRA  CON POST");
	} catch {
		res.status(404).json({ message: error.message });
	}
});

module.exports = router;
