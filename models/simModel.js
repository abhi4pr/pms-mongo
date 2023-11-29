const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");

const simModel = new mongoose.Schema({
  sim_id: {
    type: Number,
    required: true,
    unique: true,
  },
  sim_no: {
    type: Number,
    required: true,
    unique: true,
  },
  Remarks: {
    type: String,
    required: false,
    default: "",
  },
  created_by: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "",
  },
  s_type: {
    type: String,
    required: false,
    default: "",
  },
  assetsName: {
    type: String,
    required: false,
    default: "",
  },
  assetsOtherID: {
    type: Number,
    required: false,
    default: 0,
  },
  category_id: {
    type: Number,
    required: true,
  },
  sub_category_id: {
    type: Number,
    required: true,
  },
  vendor_id: {
    type: Number,
    required: true,
  },
  inWarranty: {
    type: String,
    required: false,
    default: "",
  },
  warrantyDate: {
    type: Date,
    default: "",
  },
  dateOfPurchase: {
    type: Date,
    default: "",
  },
  selfAuditPeriod: {
    type: Number,
    required: false,
    default: 90,
  },
  selfAuditUnit: {
    type: Number,
    required: false,
    default: 0,
  },
  hrAuditPeriod: {
    type: Number,
    required: false,
    default: 90,
  },
  hrAuditUnit: {
    type: Number,
    required: false,
    default: 0,
  },
  invoiceCopy: {
    type: String,
    required: false,
    default: "",
  },
  assetsValue: {
    type: Number,
    required: false,
    default: 0,
  },
  assetsCurrentValue: {
    type: Number,
    required: false,
    default: 0,
  },
  Creation_date: {
    type: Date,
    default: Date.now,
  },
  Last_updated_date: {
    type: Date,
    default: Date.now,
  },
  hrAuditFlag: {
    type: Boolean,
    default: false,
  },
  selfAuditFlag: {
    type: Boolean,
    default: false,
  },
});

AutoIncrement.initialize(mongoose.connection);
simModel.plugin(AutoIncrement.plugin, {
  model: "simModels",
  field: "sim_id",
  startAt: 1,
  incrementBy: 1,
});

module.exports = mongoose.model("simModel", simModel);
