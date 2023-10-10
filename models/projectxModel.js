const { default: mongoose } = require("mongoose");
const AutoIncrement = require("mongoose-auto-increment");

const projectxSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  page_name: {
    type: String,
    required: true,
  },
  page_id: {
    type: Number,
    required: true,
  },
  page_user_id: {
    type: Number,
    required: true,
  },
  projectx_user_id: {
    type: Number,
    required: true,
  },
  followers_count: {
    type: Number,
    required: true,
  },
  track: {
    type: Number,
    required: true,
  },
  manage_by: {
    type: Number,
    required: true,
  },
  page_link: {
    type: String,
    default: "",
  },
  profile_type: {
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
});

AutoIncrement.initialize(mongoose.connection);
projectxSchema.plugin(AutoIncrement.plugin, {
  model: "projectxModel",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("projectxModel", projectxSchema);
