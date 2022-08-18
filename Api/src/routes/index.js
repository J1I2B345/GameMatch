const { Router } = require("express");
const router = Router();
const games = require("./gameRoutes");
const users = require("./userRoutes");
const chats = require("./chatRoutes");
const news = require("./newsRoutes");
const review = require("./reviewsRutes");
const auth = require("./authRoute");
const pago = require("./mercadoPago");
const reports = require('./reportUsers') 

//-------------------------------
router.use("/games", games);
router.use("/users", users);
router.use("/chats", chats);
router.use("/news", news);
router.use("/review", review);
router.use("/auth", auth);
router.use("/pago", pago);
router.use("/reports", reports);

//-------------------------------

module.exports = router;
