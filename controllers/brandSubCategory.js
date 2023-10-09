const brandSubCategoryModel = require("../models/brandSubCategoryModel.js");

exports.addBrandSubCategory = async (req, res) => {
    const { brandSubCategory_name, brand_id, created_by } = req.body;
    try {
        const brandsubcategory = new brandSubCategoryModel({
            brandSubCategory_name,
            brand_id,
            created_by
        });
        const savedbrandsubcategory = await brandsubcategory.save();
        res.status(200).send({
            data: savedbrandsubcategory,
            message: "brandsubcategory created success",
        });
    } catch (err) {
        res.status(500).send({
            error: err,
            message: "Error adding brandsubcategory to database",
        });
    }
};

exports.getBrandSubCategorys = async (req, res) => {
    try {
        const brandsubcategorydata = await brandSubCategoryModel.find();
        if (brandsubcategorydata.length === 0) {
            res
                .status(200)
                .send({ success: true, data: [], message: "No Record found" });
        } else {
            res.status(200).send({ data: brandsubcategorydata });
        }
    } catch (err) {
        res
            .status(500)
            .send({ error: err, message: "Error getting all brandsubcategorydata" });
    }
};