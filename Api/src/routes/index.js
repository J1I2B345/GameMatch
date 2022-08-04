const { Router } = require("express");
const router = Router();
const games = require("./gameRoutes");
const users = require("./userRoutes");
const chats = require("./chatRoutes")

//-------------------------------
router.use("/games", games);
router.use("/users", users);
router.use("/chats", chats)

//-------------------------------

module.exports = router;
