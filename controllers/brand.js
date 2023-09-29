const brandSchema = require("../models/brand");

exports.addBrand = async (req, res) => {
  try {
    const brandObj = new brandSchema({
      brand_name: req.body.brand_name,
      category_id: req.body.category_id,
      sub_category_id: req.body.sub_category_id,
      igusername: req.body.igusername,
      whatsapp: req.body.whatsapp,
      status: req.body.status,
      user_id: req.body.user_id,
      major_category: req.body.major_category,
      created_by: req.body.created_by,
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
      res.status(200).send({ success: true, data: [], message: "No Record found" });
    } else {
      res.status(200).send({ data: brands });
    }
  } catch (err) {
    res.status(500).send({ error: err, message: "Error getting all brands" });
  }
};

exports.getBrandById = async (req, res) => {
  try {
    const brand = await brandSchema.findById(req.params.id);
    if (!brand) {
      return res
        .status(500)
        .send({ success: false, data: {}, message: "No Record found" });
    } else {
      res.status(200).send({ data: brand });
    }
  } catch (err) {
    res.status(500).send({ error: err, message: "Error getting brand details" });
  }
};

exports.editBrand = async (req, res) => {
  try {
    const editBrandObj = await brandSchema.findByIdAndUpdate(
      req.body.brand_id,
      {
        brand_name: req.body.brand_name,
        category_id: req.body.category_id,
        sub_category_id: req.body.sub_category_id,
        igusername: req.body.igusername,
        whatsapp: req.body.whatsapp,
        status: req.body.status,
        user_id: req.body.user_id,
        major_category: req.body.major_category,
        updated_by: req.body.updated_by,
        updated_at: Date.now(),
      }
    );

    if (!editBrandObj) {
      res.status(500).send({ success: false });
    } else {
      res.status(200).send({ success: true });
    }
  } catch (err) {
    res.status(500).send({ error: err, message: "Error updating brand details" });
  }
};

exports.deleteBrand = async (req, res) => {
  brandSchema
    .findByIdAndRemove(req.params.id)
    .then((item) => {
      if (item) {
        return res
          .status(200)
          .json({ success: true, message: "brand deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "brand not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, message: err });
    });
};
