const response = require("../../common/response");
const reportAssignToModel = require("../../models/Instagram/reportAssignTo");

exports.addDataIntoReportAssign = async (req, res) => {
  try {
    const { user_id, assign_by, assess_brand_id, campaign_id, created_by, updated_by } = req.body;

    const doc = new reportAssignToModel({
        user_id, assign_by, assess_brand_id, campaign_id, created_by, updated_by
    });

    const savedDoc = await doc.save();

    return response.returnTrue(
      200,
      req,
      res,
      "Data Created Successfully",
      savedDoc
    );
  } catch (err) {
 
      return response.returnFalse(500, req, res, err.message, {});
    }
};
exports.getDataFromReportAssign = async (req, res) => {
  try {
    const docs = await reportAssignToModel.find();
    if (docs.length === 0) {
      return response.returnFalse(200, req, res, "No record found", []);
    } else {
      return response.returnTrue(
        200,
        req,
        res,
        "Data Fetch Successfully",
        docs
      );
    }
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
exports.getSingleDataFromReportAssign = async (req, res) => {
  try {
    const doc = await reportAssignToModel.findById(req?.params?.id);
    if (!doc) {
      return response.returnFalse(200, req, res, "No record found", {});
    } else {
      return response.returnTrue(200, req, res, "Data Fetch Successfully", doc);
    }
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
exports.editDataToReportAssign = async (req, res) => {
  try {

    const editDocObj = await reportAssignToModel.findByIdAndUpdate(
      req.body._id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!editDocObj) {
      return response.returnFalse(200, req, res, "No record found");
    }

    return response.returnTrue(
      200,
      req,
      res,
      "Data Update Successfully",
      editDocObj
    );
  } catch (err) {
      return response.returnFalse(500, req, res, err.message, {});
  }
};
exports.deleteDataFromReportAssign = async (req, res) => {
  try {
    const result = await reportAssignToModel.findByIdAndDelete(req.params.id);
    if (result) {
      return response.returnTrue(
        200,
        req,
        res,
        `Document with ID ${req.params?.id} deleted successfully.`
      );
    } else {
      return response.returnFalse(
        200,
        req,
        res,
        `Document with ID ${req.params?.id} not found.`
      );
    }
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
