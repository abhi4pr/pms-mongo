const { default: mongoose } = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");

const instaBrandSchema = new mongoose.Schema({
  instaBrandId: {
    type: Number,
    required: true,
    unique: true,
  },
  instaBrandName: {
    type: String,
    required: true,
    unique: true,
  },
  brandCategoryId: {
    type: Number,
    required: false,
  },
  brandCategoryName: {
    type: String,
    required: false,
  },
  brandSubCategoryId: {
    type: Number,
    required: false,
  },
  brandSubCategoryName: {
    type: String,
    required: false,
  },
  igUserName: {
    type: String,
    default: "",
  },
  whatsApp: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  majorCategory: {
    type: String,
    default: "",
  },
  userId: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

AutoIncrement.initialize(mongoose.connection);
instaBrandSchema.plugin(AutoIncrement.plugin, {
  model: "instaBrand",
  field: "instaBrandId",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("instaBrand", instaBrandSchema);
