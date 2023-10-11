const constant = require("../common/constant.js");
const response = require("../common/response");
const productModel = require("../models/productModel");
const fs = require("fs");
const path = require("path");
const productPropsModel = require("../models/productPropsModel.js");

//Product Related api's

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

exports.getProductById = async (req, res) => {
  try {
    let match_condition = {
      product_id: parseInt(req.params.id),
    };
    let product = await productModel.aggregate([
      {
        $match: match_condition,
      },
      {
        $lookup: {
          from: "productpropsmodels",
          localField: "product_id",
          foreignField: "product_id",
          as: "Product_Prop",
        },
      },
    ]);
    if (!product?.[0]) {
      return response.returnFalse(
        200,
        req,
        res,
        "No Record Found with this Product id.",
        {}
      );
    }
    const url = `${constant.base_url}/uploads/productImage/`;
    const dataWithFileUrls = product.map((item) => ({
      ...item,
      imageUrl: item.Product_image ? url + item.Product_image : "",
    }));
    return response.returnTrue(
      200,
      req,
      res,
      "Product Fetch successfully.",
      dataWithFileUrls[0]
    );
  } catch (error) {
    return response.returnFalse(500, req, res, error.message, {});
  }
};

exports.deleteProductById = async (req, res) => {
  const id = parseInt(req.params.id);
  const condition = { product_id: id };
  try {
    const result = await productModel.findOneAndDelete(condition);
    if (result) {
      const productImagesFolder = path.join(
        __dirname,
        "../uploads/productImage"
      );
      const imageFileName = result.Product_image;

      if (imageFileName) {
        const imagePath = path.join(productImagesFolder, imageFileName);
        fs.unlink(imagePath, (err) => {
          if (err) {
            return res.status(200).json({
              success: false,
              message: err.message,
            });
          } else {
            return res.status(200).json({
              success: true,
              message: `Product with ID ${id} deleted successfully`,
            });
          }
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: `Product with ID ${id} not found`,
      });
    }
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};

//Product Props related api's

exports.addProductProps = async (req, res) => {
  try {
    const {
      type_id,
      prop_name,
      remark,
      created_by,
      product_id,
      prop_category,
    } = req.body;
    let productIdToUse;

    if (product_id) {
      productIdToUse = product_id;
    } else {
      const lastProduct = await productModel
        .findOne({}, "product_id")
        .sort({ product_id: -1 })
        .limit(1);

      productIdToUse = lastProduct.product_id;
    }
    const productPropsObj = new productPropsModel({
      type_id,
      prop_name,
      remark,
      created_by,
      product_id: productIdToUse,
      prop_category,
    });

    const savedProductProps = await productPropsObj.save();
    return response.returnTrue(
      200,
      req,
      res,
      "Product props created successfully",
      savedProductProps
    );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};

exports.getProductPropsByProductId = async (req, res) => {
  try {
    let match_condition = {
      product_id: parseInt(req.params.product_id),
    };

    const result = await productPropsModel.aggregate([
      {
        $match: match_condition,
      },
      {
        $lookup: {
          from: "productmodels",
          localField: "product_id",
          foreignField: "product_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },

      {
        $project: {
          _id: 0,
          type_id: 1,
          prop_category: 1,
          prop_name: 1,
          product_id: 1,
          created_by: 1,
          created_at: 1,
          last_updated_by: 1,
          last_updated_at: 1,
          Product_name: "$product.Product_name",
        },
      },
    ]);
    if (!result?.[0]) {
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
      "Product Props Fetch successfully.",
      result[0]
    );
  } catch (error) {
    return response.returnFalse(500, req, res, error.message, {});
  }
};

exports.editProductProps = async (req, res) => {
  try {
    const editProductPropsObj = await productPropsModel.findOneAndUpdate(
      { id: parseInt(req.params.id) }, // Filter condition
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!editProductPropsObj) {
      return response.returnFalse(
        200,
        req,
        res,
        "No Record Found with this Product Prop id.",
        {}
      );
    }
    return response.returnTrue(
      200,
      req,
      res,
      "Product Prop updated successfully.",
      editProductPropsObj
    );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};

exports.deleteProductProp = async (req, res) => {
  const id = parseInt(req.params.id);
  const condition = { id };
  try {
    const result = await productPropsModel.deleteOne(condition);
    if (result.deletedCount === 1) {
      return res.status(200).json({
        success: true,
        message: `Prop with ID ${id} deleted successfully`,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: `Prop with ID ${id} not found`,
      });
    }
  } catch (err) {
    return res.status(400).json({ success: false, message: err });
  }
};
