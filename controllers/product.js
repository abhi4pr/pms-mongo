const response = require("../common/response");
const productModel = require("../models/productModel");

exports.addProduct = async (req, res) => {
  try {
    const {
      Product_name,
      Product_type,
      Duration,
      Stock_qty,
      Unit,
      Opening_stock,
      Opening_stock_date,
      Remarks,
      created_by,
      props1,
      props2,
      props3,
    } = req.body;

    const productObj = new productModel({
      Product_name,
      Product_type,
      Duration,
      Stock_qty,
      Unit,
      Opening_stock,
      Opening_stock_date,
      Remarks,
      Created_by: created_by,
      props1,
      props2,
      props3,
      Product_image: req?.file?.filename,
    });

    const savedProduct = await productObj.save();
    return response.returnTrue(
      200,
      req,
      res,
      "Product created successfully",
      savedProduct
    );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};

exports.editProduct = async (req, res) => {
  try {
    const editProductObj = await productModel.findOneAndUpdate(
      { product_id: parseInt(req.body.id) }, // Filter condition
      {
        $set: { ...req.body, Product_image: req?.file?.filename },
      },
      { new: true }
    );
    if (!editProductObj) {
      return response.returnFalse(
        200,
        req,
        res,
        "No Record Found with this Product id.",
        {}
      );
    }
    return response.returnTrue(
      200,
      req,
      res,
      "Product updated successfully.",
      editProductObj
    );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
