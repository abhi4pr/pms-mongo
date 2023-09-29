const { default: mongoose } = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");

const brandSchema = new mongoose.Schema({
  brand_id: {
    type: Number,
    required: true,
    unique: true,
  },
  brand_name: {
    type: String,
    required: true,
  },
  category_id: {
    type: Number,
    required: true,
    default: 0,
  },
  sub_category_id: {
    type: Number,
    required: true,
    default: 0,
  },
  igusername: {
    type: String,
    required: "",
  },
  whatsapp: {
    type: String,
    required: "",
  },
  major_category: {
    type: Number,
    required: true,
    default: 0,
  },
  user_id: {
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
    required: true,
  },
});

AutoIncrement.initialize(mongoose.connection);
brandSchema.plugin(AutoIncrement.plugin, {
  model: "brand",
  field: "brand_id",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("brand", brandSchema);
