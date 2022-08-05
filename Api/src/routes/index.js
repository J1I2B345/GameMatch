const { Router } = require("express");
const router = Router();
const games = require("./gameRoutes");
const users = require("./userRoutes");
const chats = require("./chatRoutes")
const news  = require("./newsRoutes")
const review = require("./reviewsRutes")
//-------------------------------
router.use("/games", games);
router.use("/users", users);
router.use("/chats", chats);
router.use("/news", news)
router.use("review", review)
//-------------------------------

module.exports = router;
