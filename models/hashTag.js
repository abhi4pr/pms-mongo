const { default: mongoose } = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");

const hashTagSchema = new mongoose.Schema({
  hash_tag_id: {
    type: Number,
    required: true,
    unique: true,
  },
  hash_tag: {
    type: String,
    default: "",
  },
  tag: {
    type: String,
    default: "",
  },
  keyword: {
    type: String,
    default: "",
  },


});

AutoIncrement.initialize(mongoose.connection);
hashTagSchema.plugin(AutoIncrement.plugin, {
  model: "hash_tag_mast",
  field: "hash_tag_id",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("hash_tag_mast", hashTagSchema);
