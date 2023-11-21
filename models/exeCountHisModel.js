const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");

const exeCountHisModel = new mongoose.Schema({
  p_id: {
    type: Number,
    required: true
  },
  reach: {
    type: Number,
    required: false,
    default:0
  },
  impression:{
    type: Number,
    required: false,
    default:0
  },
  engagement:{
    type: Number,
    required: false,
    default:0
  },
  story_view:{
    type: Number,
    required: false,
    default:0
  },
  stats_for:{
    type: String,
    required: false,
    default: ""
  },
  start_date:{
    type: Date,
    required: false
  },
  end_date:{
    type: Date,
    required: false
  },
  media:{
    type: String,
    required: false,
    default: ""
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

// AutoIncrement.initialize(mongoose.connection);
// vendorModel.plugin(AutoIncrement.plugin, {
//   model: "exeCountHisModels",
//   field: "p_id",
//   startAt: 1,
//   incrementBy: 1,
// });

module.exports = mongoose.model("exeCountHisModel", exeCountHisModel);
