const constant = require("../common/constant.js");
const contentSectionRegSchema = require("../models/contentSectionRegCmpModel.js");

exports.addContentSectionReg = async (req, res) => {
  try {
    const {
      register_campaign_id,
      content_type_id,
      content_brief,
      campaign_brief,
      campaign_dt,
      creator_dt,
      admin_remark,
      creator_remark,
      est_static_vedio,
      status,
      stage,
      assign_to,
      cmpAdminDemoLink
    } = req.body;

    const content_sec_file = req.files?.content_sec_file?.[0]?.filename ?? "";
    const cmpAdminDemoFile = req.files?.cmpAdminDemoFile?.[0]?.filename ?? "";
    const ContentSectionRegObj = new contentSectionRegSchema({
      register_campaign_id,
      content_type_id,
      content_brief,
      campaign_brief,
      campaign_dt,
      creator_dt,
      admin_remark,
      content_sec_file,
      cmpAdminDemoFile,
      cmpAdminDemoLink,
      creator_remark,
      est_static_vedio,
      status,
      stage,
      assign_to,
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
          from: "registercampaignmodels",
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
          register_campaign_id: 1,
          content_type_id: 1,
          content_section_id: 1,
          content_brief: 1,
          campaign_brief: 1,
          campaign_dt: 1,
          creator_dt: 1,
          admin_remark: 1,
          creator_remark: 1,
          content_sec_file: 1,
          est_static_vedio: 1,
          cmpAdminDemoLink: 1,
          cmpAdminDemoFile: 1,
          status: 1,
          stage: 1,
          assign_to: 1,
          brand_id: "$data.brand_id",
          brnad_dt: "$data.brnad_dt",
          excel_path: "$data.excel_path",
          commitment: "$data.commitment",
          detailing: "$data.detailing",
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
        download_content_sec_file: item.content_sec_file ? url + item.content_sec_file : "",
        downloadCmpAdminDemoFile: item.cmpAdminDemoFile ? url + item.cmpAdminDemoFile : "",
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

exports.editContentSectionReg = async (req, res) => {
  try {
    let updateObj = {
      ...req.body,
      content_sec_file: req.files?.content_sec_file?.[0]?.filename,
      cmpAdminDemoFile: req.files?.cmpAdminDemoFile?.[0]?.filename,
    };

    const editContentSectionRegObj =
      await contentSectionRegSchema.findOneAndUpdate(
        { content_section_id: parseInt(req.body.content_section_id) }, // Filter condition
        {
          $set: updateObj,
        },
        { new: true }
      );

    if (!editContentSectionRegObj) {
      return res
        .status(200)
        .send({ success: false, message: "ContentSectionReg not found" });
    }

    return res
      .status(200)
      .send({ success: true, data: editContentSectionRegObj });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err,
      message: "Error updating ContentSectionReg details",
    });
  }
};
