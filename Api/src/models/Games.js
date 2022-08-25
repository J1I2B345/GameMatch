const { Schema, model } = require("mongoose");

const schema = new Schema(
	{
		name: {
			type: String,
			required: true,
			
			unique: true,
		},
		image: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		elo: {
			type: Array,
			required: true,
			default: ["Casual"],
		},
		position: {
			type: Array,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);


module.exports = model("Game", schema);
