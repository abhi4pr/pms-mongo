const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");

const userLoginHisModel = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true
  },
  user_email_id: {
    type: String,
    required: true
  },
  login_date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("userLoginHisModel", userLoginHisModel);