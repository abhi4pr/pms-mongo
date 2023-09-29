const campaginSchema = require("../models/campaign.js");

exports.getCampaigns = async (req, res) => {
  try {
    const campaign = await campaginSchema.find();

    if (campaign.length === 0) {
      res
        .status(200)
        .send({ success: true, data: [], message: "No Record found" });
    } else {
      res.status(200).send({ success: true, data: campaign });
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: err, message: "Error getting all Campaigns" });
  }
};

exports.addCampaign = async (req, res) => {
  try {
    const campaignObj = new campaginSchema({
      campaign_name: req.body.campaign_name,
      hash_tag: req.body.hash_tag,
      user_id: req.body.user_id,
      agency_id: req.body.agency_id,
      status: req.body.status,
      created_by: req.body.created_by,
    });
    const savedcampaign = await campaignObj.save();
    res.send({ data: savedcampaign, status: 200 });
  } catch (err) {
    res
      .status(500)
      .send({ error: err, message: "This campaign cannot be created" });
  }
};

exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await campaginSchema.findById(req.params.id);
    if (!campaign) {
      res
        .status(200)
        .send({ success: true, data: {}, message: "No Record found" });
    } else {
      res.status(200).send({ success: true, data: campaign });
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: err, message: "Error getting campaign details" });
  }
};

exports.editCampaign = async (req, res) => {
  try {
    const editCampaignObj = await campaginSchema.findByIdAndUpdate(
      req.body.campaign_id,
      {
        campaign_name: req.body.campaign_name,
        hash_tag: req.body.hash_tag,
        user_id: req.body.user_id,
        agency_id: req.body.agency_id,
        status: req.body.status,
        updated_by: req.body.updated_by,
        updated_at: Date.now(),
      }
    );

    if (!editCampaignObj) {
      res.status(500).send({ success: false });
    } else {
      res.status(200).send({ success: true });
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: err, message: "Error updating campaign details" });
  }
};

exports.deleteCampaign = async (req, res) => {
  campaginSchema
    .findByIdAndRemove(req.params.id)
    .then((item) => {
      if (item) {
        return res
          .status(200)
          .json({ success: true, message: "campaign deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "campaign not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, message: err });
    });
};

