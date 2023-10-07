const brandMajorCategoryModel = require("../models/brandMajorCategoryModel.js");

exports.addBrandMajorCategory = async (req, res) => {
    const { brandMajorCategory_name, brand_id, created_by } = req.body;
    try {
        const brandmajorcategory = new brandMajorCategoryModel({
            brandMajorCategory_name,
            brand_id,
            created_by
        });
        const savedbrandmajorcategory = await brandmajorcategory.save();
        res.status(200).send({
            data: savedbrandmajorcategory,
            message: "brandmajorcategory created success",
        });
    } catch (err) {
        res.status(500).send({
            error: err,
            message: "Error adding brandmajorcategory to database",
        });
    }
};

exports.getBrandMajorCategorys = async (req, res) => {
    try {
        const brandmajorcategorydata = await brandMajorCategoryModel.find();
        if (brandmajorcategorydata.length === 0) {
            res
                .status(200)
                .send({ success: true, data: [], message: "No Record found" });
        } else {
            res.status(200).send({ data: brandmajorcategorydata });
        }
    } catch (err) {
        res
            .status(500)
            .send({ error: err, message: "Error getting all brandmajorcategorydata" });
    }
};