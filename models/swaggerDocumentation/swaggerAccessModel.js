const { default: mongoose } = require("mongoose");

const swaggerAccessSchema = new mongoose.Schema({
  email: {
    type: String,
    unique : true,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "Active",
  },

});
module.exports = mongoose.model("swaggerAccessModel", swaggerAccessSchema);
