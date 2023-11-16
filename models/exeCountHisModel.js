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
  creation_date: {
    type: Date,
    default: Date.now,
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
