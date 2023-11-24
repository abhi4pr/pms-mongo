const { default: mongoose } = require("mongoose");
// const AutoIncrement = require("mongoose-auto-increment");

const campaignPhaseSchema = new mongoose.Schema({
    
});


module.exports = mongoose.model(
  "CampaignPhaseModel",
  campaignPhaseSchema
);
