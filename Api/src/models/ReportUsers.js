const { Schema, model } = require("mongoose");

const schema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		reference: "Users",
		required: true,
	},
	reportedUser: {
		type: Schema.Types.ObjectId,
		referece: "Users",
		required: true,
	},
	reason: {
		type: String,
		required: true,
	},
});
module.exports = model("ReportUsers", schema);
