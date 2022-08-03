const { Router } = require("express");
const router = Router();
const games = require("./gameRute");
const user = require("./userRute");

//-------------------------------
router.use("/games", games);
router.use("/user", user);

//-------------------------------

module.exports = router;
