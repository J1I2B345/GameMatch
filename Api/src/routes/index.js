const { Router } = require("express");
const router = Router();
const games = require("./gameRute");


//-------------------------------
router.use('/games', games);


//-------------------------------

module.exports = router;
