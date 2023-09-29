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
    required: true,
  },

  user_id: {
    type: Number,
    required: true,
    default: 0,
  },

  agency_id: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    default: "",
  },
  updated_at: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: Number,
    required: true,
  },
  updated_by: {
    type: Number,
  },
});

AutoIncrement.initialize(mongoose.connection);
campaignSchema.plugin(AutoIncrement.plugin, {
  model: "campaign",
  field: "campaign_id",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("campaign", campaignSchema);
