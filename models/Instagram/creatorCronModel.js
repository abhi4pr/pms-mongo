const mongoose = require("mongoose");
const creatorCronSchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      required: false,
      default: "",
    },
    cronExpression: {
      type: String,
      required: false,
      default: "",
    },
    trackingStatus: {
      type: Boolean,
      default: true,
    },
    scheduled: {
      type: Boolean,
      default: false,
    },
    scheduledCount: {
      type: Number,
      default: 0,
    },
    scheduledCountTracked: {
      type: Number,
      default: 0,
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

module.exports = mongoose.model("creatorCronModel", creatorCronSchema);
