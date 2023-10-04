const { default: mongoose } = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");

const registerCampaignSchema = new mongoose.Schema({
  register_campaign_id: {
    type: Number,
    required: true,
    unique: true,
  },
  brand_id: {
    type: Number,
  },
  brnad_dt: {
    type: String,
    default: "",
  },
  excel_path: {
    type: String,
    default: "",
  },
  //   commitment: [String],
  commitment: [mongoose.Schema.Types.Mixed],
});

AutoIncrement.initialize(mongoose.connection);
registerCampaignSchema.plugin(AutoIncrement.plugin, {
  model: "register_campaign",
  field: "register_campaign_id",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("register_campaign", registerCampaignSchema);
