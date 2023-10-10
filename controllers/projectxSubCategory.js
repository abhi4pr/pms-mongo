const projectxSubCategorySchema = require("../models/projectxSubCategoryModel.js");

exports.addProjectxSubCategory = async (req, res) => {
  const { sub_category_name, category_id } = req.body;
  try {
    const projectxSubCategoryObj = new projectxSubCategorySchema({
      sub_category_name,
      category_id,
    });
    const savedprojectxSubCategory = await projectxSubCategoryObj.save();
    if (!projectxSubCategoryObj) {
      res
        .status(500)
        .send({ success: false, data: {}, message: "Something went wrong.." });
    } else {
      res.status(200).send({
        data: savedprojectxSubCategory,
        message: "projectxsubcategory created success",
      });
    }
  } catch (err) {
    res.status(500).send({
      error: err,
      message: "Error adding projectxsubcategory to database",
    });
  }
};

exports.getProjectxSubCategory = async (req, res) => {
  try {
    const projectxSubCategory = await projectxSubCategorySchema.find();
    if (projectxSubCategory.length === 0) {
      res
        .status(200)
        .send({ success: true, data: [], message: "No Record found" });
    } else {
      res.status(200).send({ data: projectxSubCategory });
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: err, message: "Error getting all projectxSubCategory" });
  }
};

exports.getProjectxSubCategoryById = async (req, res) => {
  try {
    const fetchedData = await projectxSubCategorySchema.findOne({
      sub_category_id: parseInt(req.params.id),
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
      message: "Error getting projectxSubCategorySchema details",
    });
  }
};

exports.editProjectxSubCategory = async (req, res) => {
  try {
    const { sub_category_id, category_id, sub_category_name } = req.body;

    const editProjectxSubCategoryObj =
      await projectxSubCategorySchema.findOneAndUpdate(
        { sub_category_id },
        { $set: { sub_category_name, category_id } },
        { new: true }
      );

    if (!editProjectxSubCategoryObj) {
      return res
        .status(200)
        .send({ success: false, message: "Sub category not found" });
    }

    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({
      error: err,
      message: "Error updating the projectxsubcategory in the database",
    });
  }
};

exports.deleteProjectxSubCategory = async (req, res) => {
  const id = req.params.id;
  const condition = { sub_category_id: id };
  try {
    const result = await projectxSubCategorySchema.deleteOne(condition);
    if (result.deletedCount === 1) {
      return res.status(200).json({
        success: true,
        message: `projectxsubcategory with ID ${id} deleted successfully`,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: `projectxsubcategory with ID ${id} not found`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the projectxsubcategory",
      error: error.message,
    });
  }
};
