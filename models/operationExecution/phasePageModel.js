const { default: mongoose } = require("mongoose");
// const AutoIncrement = require("mongoose-auto-increment");

const phasePageSchema = new mongoose.Schema({
    
});


module.exports = mongoose.model(
  "PhasePageModel",
  phasePageSchema
);
