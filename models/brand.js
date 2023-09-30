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
  },
  igusername: {
    type: String,
    default: "",
  },
  whatsapp: {
    type: String,
    default: "",
  },
  major_category: {
    type: String,
    default: "",
  },
  user_id: {
    type: Number,
    required: true,
  },
  updated_at: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
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
