const mongoose = require("mongoose");

const devLoginHisModel = new mongoose.Schema({
  dev_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "swaggerAccessModel",
  },
  login_date: {
    type: Date,
    default: Date.now,
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  token : {
    type : String,
    default : ""
  }
});

module.exports = mongoose.model("devLoginHisModel", devLoginHisModel);
