const path = require("path");
const express = require("express");
const morgan = require("morgan");
//*cors
const cors = require("cors");
const routes = require("./routes/index.js");
//*-
const serverExpress = express();
//*----------------config ROLES --------------------------------
const config = require("./data/initialSetup");

require("./db.js");

serverExpress.use(morgan("dev"));
serverExpress.use(cors());
serverExpress.use(express.json());
// //*----------------FILE UPLOAD --------------------------------
// const fileUpload = require("express-fileupload");
// serverExpress.use(fileUpload({
// 	useTempFiles: true,
// 	tempFileDir:"./uploads",
// }));
// //*---------------
serverExpress.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

//*cuando inicia express
config.createRole();

// si modularizamos rutas
serverExpress.use("/", routes);

// Error catching endware.
serverExpress.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = serverExpress;
