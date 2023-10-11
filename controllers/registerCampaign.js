const registerCamapign = require("../models/registerCamapignModel");
const constant = require("../common/constant.js");
const response = require("../common/response");
exports.addRegisterCampaign = async (req, res) => {
  try {
    const { brand_id, brnad_dt, commitment, status, stage, detailing, exeCmpId } =
      req.body;
    const excel_file = req.file.filename ?? "";

    let parsedCommitment = JSON.parse(commitment);
    const Obj = new registerCamapign({
      brand_id,
      brnad_dt,
      status,
      excel_path: excel_file,
      commitment: parsedCommitment,
      stage,
      detailing,
      exeCmpId
    });

    const savedRegisterCampaign = await Obj.save();
    res.send({ data: savedRegisterCampaign, status: 200 });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: err, message: "This campaign cannot be created" });
  }
};

exports.getRegisterCampaigns = async (req, res) => {
  try {
    const campaigns = await registerCamapign.find();

    if (campaigns.length === 0) {
      res
        .status(204)
        .send({ success: true, data: [], message: constant.NO_RECORD_FOUND });
    } else {
      const url = `${constant.base_url}/uploads/`;
      const dataWithFileUrls = campaigns.map((item) => ({
        ...item.toObject(),
        download_excel_file: item.excel_path ? url + item.excel_path : "",
      }));
      return res.status(200).send({ success: true, data: dataWithFileUrls });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: err, message: "Error getting all Campaigns" });
  }
};

exports.editRegisterCampaign = async (req, res) => {
  try {
    const editRegisterCampaignObj = await registerCamapign.findOneAndUpdate(
      { register_campaign_id: parseInt(req.body.register_campaign_id) }, // Filter condition
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!editRegisterCampaignObj) {
      return res
        .status(204)
        .send({ success: false, message: constant.NO_RECORD_FOUND });
    }

    return res
      .status(200)
      .send({ success: true, data: editRegisterCampaignObj });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({
        error: err.message,
        message: "Error updating RegisterCampaign details",
      });
  }
};

exports.deleteRegisterCmp = async (req, res) => {
  const id = parseInt(req.params.id);
  const condition = { register_campaign_id: id };
  try {
    const result = await registerCamapign.deleteOne(condition);
    if (result.deletedCount === 1) {
      return response.returnTrue(
        200,
        req,
        res,
        `Register campaign with ID ${id} deleted successfully`,
        {}
      );
    } else {
      return response.returnFalse(
        200,
        req,
        res,
        `Register campaign with ID ${id} not found`,
        {}
      );
    }
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
