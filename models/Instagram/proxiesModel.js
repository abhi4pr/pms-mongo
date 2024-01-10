const mongoose = require("mongoose");
const proxiesSchema = new mongoose.Schema(
  {
    proxy: {
      type: String,
      required: false,
      default: "",
    },
    status: {
      type: String,
      default: "Active",
    },
    blockedTime: {
      type: String,
      default: "",
    },
    createdBy: {
      type: Number,
      required: false,
      default: 0,
    },
    updatedBy: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("proxyIpModel", proxiesSchema);