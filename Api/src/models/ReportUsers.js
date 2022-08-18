const { Schema, model } = require("mongoose");

const schema = new Schema({
    reportingUser:{
        type: String,
        reference: "Users", 
        required: true,
    },
    title: {
        type: String,
        required: true, 
    },
    reason: {
        type: String,
        required: true,
    },
    reportedUser: {
        type: String,
        reference: "Users", 
        required: true,
    },
});

module.exports = model("ReportUsers", schema);
