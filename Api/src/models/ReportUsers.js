const { Schema, model } = require("mongoose");

const schema = new Schema({
    author: {
      type: Schema.Types.ObjectId,
      reference: "Users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reportedUser: {
      type: Schema.Types.ObjectId,
      reference: "Users",
      required: false,
    },
  });
module.exports = model("ReportUsers", schema);
