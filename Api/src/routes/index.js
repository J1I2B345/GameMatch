const { Router } = require("express");
const router = Router();
const games = require("./gameRoutes");
const users = require("./userRoutes");
const chats = require("./chatRoutes")
const news  = require("./newsRoutes")
//-------------------------------
router.use("/games", games);
router.use("/users", users);
router.use("/chats", chats);

//-------------------------------

module.exports = router;
