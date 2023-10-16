const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");

const departmentModel = new mongoose.Schema({
  dept_id: {
    type: Number,
    required: true,
  },
  dept_name: {
    type: String,
    required: false,
    default: "",
  },
  Remarks: {
    type: String,
    required: false,
    default: "",
  },
  Created_date: {
    type: Date,
    default: Date.now,
  },
  Created_by: {
    type: Number,
    required: false,
    default: 0,
  },
  Last_updated_by: {
    type: Number,
  },
  Last_updated_date: {
    type: Date,
  },
});

AutoIncrement.initialize(mongoose.connection);
departmentModel.plugin(AutoIncrement.plugin, {
  model: "departmentModels",
  field: "dept_id",
  startAt: 1,
  incrementBy: 1,
});

module.exports = mongoose.model("departmentModel", departmentModel);
