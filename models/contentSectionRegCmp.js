const { default: mongoose } = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");

const contentSectionRegSchema = new mongoose.Schema({
  content_section_id: {
    type: Number,
    required: true,
    unique: true,
  },
  register_campaign_id: {
    type: Number,
    ref: "register_campaigns",
  },
  content_type_id: {
    type: Number,
  },
  content_brief: {
    type: String,
  },
  campaign_brief: {
    type: String,
  },
  campaign_dt: {
    type: String,
  },
  creator_dt: {
    type: String,
  },
  admin_remark: {
    type: String,
  },
  creator_remark: {
    type: String,
  },
  content_sec_file: {
    type: String,
  },
  est_static_vedio: {
    type: Number,
  },
  status: {
    type: Number,
  },
  stage: {
    type: Number,
  },
  assign_to:{
    type: Number,
   },
});

AutoIncrement.initialize(mongoose.connection);
contentSectionRegSchema.plugin(AutoIncrement.plugin, {
  model: "content_section_reg_cmp",
  field: "content_section_id",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model(
  "content_section_reg_cmp",
  contentSectionRegSchema
);
