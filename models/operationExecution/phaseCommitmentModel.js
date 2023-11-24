const { default: mongoose } = require("mongoose");
// const AutoIncrement = require("mongoose-auto-increment");

const phaseCommitmentSchema = new mongoose.Schema({
    
});


module.exports = mongoose.model(
  "PhaseCommitmentModel",
  phaseCommitmentSchema
);
