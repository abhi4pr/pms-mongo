const { default: mongoose } = require("mongoose");

const documentSchema = new mongoose.Schema({
  doc_type: {
    type: String,
    unique: true,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  priority: {
    type: String,
    default: "",
  },
  period: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("documentModel", documentSchema);
