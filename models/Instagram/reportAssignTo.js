const mongoose = require("mongoose");
const reportAssignToSchema = new mongoose.Schema({
 
  user_id: {
    type: Number,
    required: false,
    default: 0,   
  },
  assign_by: {
    type: Number,
    required: false,
    default: 0, 
  },
  assess_brand_id: {
    type: Array,
    default: [],
  },
  campaign_id: {
    type: Array,
    default: [],
  },
  created_by: {
    type: Number,
    required: false,
    default: 0
  },
  updated_by: {
    type: Number,
    required: false,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("reportAssignToModel", reportAssignToSchema);
