const { default: mongoose } = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");

const commitmentSchema = new mongoose.Schema({
  cmtId: {
    type: Number,
    required: true,
    unique: true,
  },
  cmtName: {
    type: String,
  },
  cmtValue: {
    type: Number,
  },
});

AutoIncrement.initialize(mongoose.connection);
commitmentSchema.plugin(AutoIncrement.plugin, {
  model: "commitmentMast",
  field: "cmtId",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model(
  "commitmentMast",
  commitmentSchema
);
