const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  weatherData: [
    {
      date: {
        type: Date,
        required: true,
      },
      data: {
        type: Object,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
