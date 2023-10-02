const { default: mongoose } = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");

const projectxCategorySchema = new mongoose.Schema({
  category_id: {
    type: Number,
    required: true,
    unique: true,
  },
  brand_id: {
    type: Number,
    required: true,
    default: 0,
  },
  category_name: {
    type: String,
    required: true,
    default: "",
  },
});

AutoIncrement.initialize(mongoose.connection);
projectxCategorySchema.plugin(AutoIncrement.plugin, {
  model: "projectx_category_mast",
  field: "category_id",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model(
  "projectx_category_mast",
  projectxCategorySchema
);
