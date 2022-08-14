const { Schema, model } = require("mongoose");

const schema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
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
schema.pre("validate", function (next) {
	if (typeof this.name === "string") throw new Error("name must be a string");
	if (typeof this.image === "string")
		throw new Error("insert a url of a image");
	if (typeof this.gender === "string")
		throw new Error("gender must be a string");
	next();
});

module.exports = model("Game", schema);
