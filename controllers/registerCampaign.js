const registerCamapign = require("../models/registerCamapign");
const constant = require("../common/constant.js");
exports.addRegisterCampaign = async (req, res) => {
  try {
    const { brand_id, brnad_dt, commitment } = req.body;
    const excel_file = req.file.filename ?? '';
    let parsedCommitment = JSON.parse(commitment);
    const Obj = new registerCamapign({
      brand_id,
      brnad_dt,
      excel_path: excel_file,
      commitment: parsedCommitment,
    });

    const savedRegisterCampaign = await Obj.save();
    res.send({ data: savedRegisterCampaign, status: 200 });
  } catch (err) {
    console.log(err)
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
        .status(200)
        .send({ success: true, data: [], message: "No Record found" });
    } else {
      const url = `${constant.base_url}/api/uploads/`;
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
