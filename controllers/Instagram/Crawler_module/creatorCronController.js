const response = require("../../../common/response");
const creatorCronModel = require("../../../models/Instagram/creatorCronModel");

exports.addCronForCreator= async (req, res) => {
  try {
    const { creator, cronExpression, trackingStatus, createdBy, updatedby, scheduledCount } = req.body;

    const cron = new creatorCronModel({
        creator, cronExpression, trackingStatus, createdBy, updatedby, scheduledCount
    });

    const savedCron = await cron.save();

    return response.returnTrue(
      200,
      req,
      res,
      "Data Created Successfully",
      savedCron
    );
  } catch (err) {
 
      return response.returnFalse(500, req, res, err.message, {});
    }
};
exports.getCronForCreator = async (req, res) => {
  try {
    const crons = await creatorCronModel.find();
    if (crons.length === 0) {
      return response.returnFalse(200, req, res, "No record found", []);
    } else {
      return response.returnTrue(
        200,
        req,
        res,
        "Data Fetch Successfully",
        crons
      );
    }
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
exports.getSingleCronForCreator = async (req, res) => {
  try {
    const cron = await creatorCronModel.findById(req.params.id);
    if (!cron ) {
      return response.returnFalse(200, req, res, "No record found", {});
    } else {
      return response.returnTrue(200, req, res, "Data Fetch Successfully", cron);
    }
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
exports.editCronForCreator = async (req, res) => {
  try {

    const editCronObj = await creatorCronModel.findByIdAndUpdate(
      req.body._id,
       req.body,
      { new: true }
    );

    if (!editCronObj) {
      return response.returnFalse(200, req, res, "No record found");
    }

    return response.returnTrue(
      200,
      req,
      res,
      "Data Update Successfully",
      editCronObj
    );
  } catch (err) {
      return response.returnFalse(500, req, res, err.message, {});
  }
};
exports.deleteCronForCreator = async (req, res) => {
  try {
    const result = await creatorCronModel.findByIdAndDelete(req.params.id);
    if (result) {
      return response.returnTrue(
        200,
        req,
        res,
        `Cron with ID ${req.params?.id} deleted successfully.`
      );
    } else {
      return response.returnFalse(
        200,
        req,
        res,
        `Cron with ID ${req.params?.id} not found.`
      );
    }
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
