const brandCategoryModel = require("../models/brandCategoryModel.js");

exports.addBrandCategory = async (req, res) => {
    const { brandCategory_name, brand_id, created_by } = req.body;
    try {
        const brandcategory = new brandCategoryModel({
            brandCategory_name,
            brand_id,
            created_by
        });
        const savedbrandcategory = await brandcategory.save();
        res.status(200).send({
            data: savedbrandcategory,
            message: "brandcategory created success",
        });
    } catch (err) {
        res.status(500).send({
            error: err,
            message: "Error adding brandcategory to database",
        });
    }
};

exports.getBrandCategorys = async (req, res) => {
    try {
        const brandcategorydata = await brandCategoryModel.find();
        if (brandcategorydata.length === 0) {
            res
                .status(200)
                .send({ success: true, data: [], message: "No Record found" });
        } else {
            res.status(200).send({ data: brandcategorydata });
        }
    } catch (err) {
        res
            .status(500)
            .send({ error: err, message: "Error getting all brandcategorydata" });
    }
};