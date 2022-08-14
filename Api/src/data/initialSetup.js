//*----------------INITIALIZE  ROLE--------------------------------
//*--------------------AUTENTIFICATION-----------------------------
const roleSchema = require("../models/Role.js");

const createRole = async () => {
	//si ya existen
	try {
		const roleCount = await roleSchema.estimatedDocumentCount();
		if (roleCount > 0) return;

		const roles = await Promise.all([
			new roleSchema({ name: "User" }).save(), //as defaul
			//    new roleSchema({name:'Moderator'}).save(),
			new roleSchema({ name: "Admin" }).save(),
		]);
		// console.log(roles)
		console.log("intial configuration saved successfully!");
	} catch (e) {
		console.log(e.message);
	}
};
module.exports = {
	createRole,
};
