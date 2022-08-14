const { Schema, model } = require("mongoose");

const schema = new Schema(
	{
		name: "string",
	},
	{
		versionKey: false, //para que no le añada _
	}
);

module.exports = model("Role", schema);
