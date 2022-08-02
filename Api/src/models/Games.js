const { Schema, model } = require("mongoose");


const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true 
    },
    image: {
      type: String,
      required: true,
      
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Game", schema);
