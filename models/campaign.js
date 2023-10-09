const { default: mongoose } = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");

const campaignSchema = new mongoose.Schema({
  campaign_id: {
    type: Number,
    required: true,
    unique: true,
  },
  campaign_name: {
    type: String,
    required: true,
  },
  hash_tag: {
    type: String,
    default: "",
  },

  user_id: {
    type: Number,
  },

  agency_id: {
    type: Number,
    required: true,
    default: 0,
  },
  updated_date: {
    type: Date,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  updated_by: {
    type: Number,
  },
  brand_id: {
    type: Number,
  }
});

AutoIncrement.initialize(mongoose.connection);
campaignSchema.plugin(AutoIncrement.plugin, {
  model: "campaign",
  field: "campaign_id",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("campaign", campaignSchema);
