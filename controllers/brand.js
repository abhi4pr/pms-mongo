const brandSchema = require("../models/brand");

exports.addBrand = async (req, res) => {
  try {
    const {
      brand_name,
      category_id,
      sub_category_id,
      igusername,
      whatsapp,
      user_id,
      major_category,
    } = req.body;

    const brandObj = new brandSchema({
      brand_name,
      category_id,
      sub_category_id,
      igusername,
      whatsapp,
      user_id,
      major_category,
    });

    const savedBrand = await brandObj.save();
    res.send({ data: savedBrand, status: 200 });
  } catch (err) {
    res
      .status(500)
      .send({ erroradd_brand: err, message: "This brand cannot be created" });
  }
};

exports.getBrands = async (req, res) => {
  try {
    const brands = await brandSchema.find();
    if (brands.length === 0) {
      res
        .status(200)
        .send({ success: true, data: [], message: "No Record found" });
    } else {
      res.status(200).send({ data: brands });
    }
  } catch (err) {
    res.status(500).send({ error: err, message: "Error getting all brands" });
  }
};

exports.getBrandById = async (req, res) => {
  try {
    const brand = await brandSchema.findOne({
      brand_id: parseInt(req.params.id),
    });
    if (!brand) {
      return res
        .status(200)
        .send({ success: false, data: {}, message: "No Record found" });
    } else {
      res.status(200).send({ data: brand });
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: err, message: "Error getting brand details" });
  }
};

exports.editBrand = async (req, res) => {
  try {
    const {
      brand_id,
      brand_name,
      category_id,
      sub_category_id,
      igusername,
      whatsapp,
      user_id,
      major_category,
    } = req.body;

    const editBrandObj = await brandSchema.findOneAndUpdate(
      { brand_id: parseInt(brand_id) }, // Filter condition
      {
        $set: {
          brand_name,
          category_id,
          sub_category_id,
          igusername,
          whatsapp,
          user_id,
          major_category,
          updated_at: Date.now(),
        },
      },
      { new: true }
    );

    if (!editBrandObj) {
      return res
        .status(200)
        .send({ success: false, message: "Brand not found" });
    }

    return res.status(200).send({ success: true, data: editBrandObj });
  } catch (err) {
    res
      .status(500)
      .send({ error: err, message: "Error updating brand details" });
  }
};

exports.deleteBrand = async (req, res) => {
  const id = parseInt(req.params.id);
  const condition = { brand_id: id };
  try {
    const result = await brandSchema.deleteOne(condition);
    if (result.deletedCount === 1) {
      return res.status(200).json({
        success: true,
        message: `Brand with ID ${id} deleted successfully`,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: `Brand with ID ${id} not found`,
      });
    }
  } catch (err) {
    return res.status(400).json({ success: false, message: err });
  }
};
