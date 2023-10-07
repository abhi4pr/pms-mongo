const billingheaderModel = require("../models/billingheaderModel.js");

exports.addBillingHeader = async (req, res) => {
  const { billingheader_name, dept_id } = req.body;
  try {
    const billingheaderdata = new billingheaderModel({
      billingheader_name,
      dept_id
    });
    const savedbillingheaderdata = await billingheaderdata.save();
    res.status(200).send({
        data: savedbillingheaderdata,
        message: "billingheaderdata created success",
      });
  } catch (err) {
    res.status(500).send({
      error: err,
      message: "Error adding billingheaderdata to database",
    });
  }
};

exports.getBillingHeaders = async (req, res) => {
  try {
    const billingheaderdata = await billingheaderModel.find();
    if (billingheaderdata.length === 0) {
      res
        .status(200)
        .send({ success: true, data: [], message: "No Record found" });
    } else {
      res.status(200).send({ data: billingheaderdata });
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: err, message: "Error getting all billingheaderdata" });
  }
};

exports.getBillingHeaderById = async (req, res) => {
  try {
    const fetchedData = await billingheaderModel.findOne({
      billingheader_id: parseInt(req.params.id),
    });
    if (!fetchedData) {
      return res
        .status(200)
        .send({ success: false, data: {}, message: "No Record found" });
    } else {
      res.status(200).send({ data: fetchedData });
    }
  } catch (err) {
    res.status(500).send({
      error: err,
      message: "Error getting billingheader details",
    });
  }
};

exports.editBillingHeader = async (req, res) => {
  try {
      const editbillingheader = await billingheaderModel.findOneAndUpdate({ billingheader_id: req.body.billingheader_id }, {
        billingheader_name : req.body.billingheader_name,
        dept_id : req.body.dept_id
      }, { new: true })
      if (!editbillingheader) {
          res.status(500).send({ success: false })
      }
      res.status(200).send({ success: true, data: editbillingheader })
  } catch (err) {
      res.status(500).send({
          error: err,
          message: "Error updating the billingheader in the database",
      });
  }
};

exports.deleteBillingHeader = async (req, res) => {
  const id = req.params.id;
  const condition = { billingheader_id : id };
  try {
    const result = await billingheaderModel.deleteOne(condition);
    if (result.deletedCount === 1) {
      return res.status(200).json({
        success: true,
        message: `billingheader with ID ${id} deleted successfully`,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: `billingheader with ID ${id} not found`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the billingheader",
      error: error.message,
    });
  }
};
