const constant = require("../common/constant.js");
const contentSectionRegSchema = require("../models/contentSectionRegCmp.js");

exports.addContentSectionReg = async (req, res) => {
  try {
    const {
      content_count,
      register_campaign_id,
      content_brief,
      est_static_vedio,
      status,
      content_type,
    } = req.body;

    const ContentSectionRegObj = new contentSectionRegSchema({
      content_count,
      register_campaign_id,
      content_brief,
      est_static_vedio,
      status,
      content_type,
    });

    const savedContentSectionReg = await ContentSectionRegObj.save();
    res.send({ data: savedContentSectionReg, status: 200 });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err,
      message: "This ContentSectionReg cannot be created",
    });
  }
};

exports.getContentSectionReg = async (req, res) => {
  try {
    const ContentSectionReg = await contentSectionRegSchema.aggregate([
      {
        $lookup: {
          from: "register_campaigns",
          localField: "register_campaign_id",
          foreignField: "register_campaign_id",
          as: "data",
        },
      },

      {
        $unwind: "$data",
      },

      {
        $project: {
          _id: 1,
          content_section_id: 1,
          register_campaign_id: 1,
          content_count: 1,
          content_brief: 1,
          est_static_vedio: 1,
          whatsapp: 1,
          content_type: 1,
          brand_id: "$data.brand_id",
          brnad_dt: "$data.brnad_dt",
          excel_path: "$data.excel_path",
          commitment: "$data.commitment",
        },
      },
    ]);
    if (ContentSectionReg.length === 0) {
      res
        .status(200)
        .send({ success: true, data: [], message: "No Record found" });
    } else {
      const url = `${constant.base_url}/uploads/`;
      const dataWithFileUrls = ContentSectionReg.map((item) => ({
        ...item,
        download_excel_file: item.excel_path ? url + item.excel_path : "",
      }));
      res.status(200).send({ data: dataWithFileUrls });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: err, message: "Error getting all ContentSectionReg" });
  }
};
