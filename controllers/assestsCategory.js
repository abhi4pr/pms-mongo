const response = require("../common/response.js");
const assetsCategoryModel = require("../models/assetsCategoryModel.js");
const assetsSubCategoryModel = require("../models/assetsSubCategoryModel.js");

exports.addAssetCategory = async (req, res) => {
  try {
    const assetsc = new assetsCategoryModel({
      category_name: req.body.category_name,
      description: req.body.description,
      created_by: req.body.created_by,
      last_updated_by: req.body.last_updated_by,
      selfAuditPeriod: req.body.selfAuditPeriod ,
      hrAuditPeriod: req.body.hrAuditPeriod ,
      selfAuditUnit: req.body.selfAuditUnit ,
      hrAuditUnit: req.body.hrAuditUnit
    });
    const simv = await assetsc.save();
    return response.returnTrue(
      200,
      req,
      res,
      "Assets Category Created Successfully",
      simv
    );
  } catch (err) {
    if (err.code === 11000) {
      // The error code 11000 indicates a duplicate key error (unique constraint violation)
   return   response.returnFalse(500, req, res, "Category name must be unique. Another category with the same name already exists.'", {});

    } else {
      return response.returnFalse(500, req, res, err.message, {});
    }
   
  }
};

exports.getAssetCategorys = async (req, res) => {
  try {
    const assetsc = await assetsCategoryModel.aggregate([
      // {
      //   $lookup: {
      //     from: "assetssubcategorymodels",
      //     localField: "category_id",
      //     foreignField: "category_id",
      //     as: "subcategory",
      //   },
      // },
      // {
      //   $unwind: {
      //     path: "$subcategory",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      {
        $project: {
          _id: "$_id",
          category_id: "$category_id",
          // sub_category_id: "$subcategory.sub_category_id",
          category_name: "$category_name", 
          // sub_category_name: "$subcategory.sub_category_name",
          created_by: "$created_by",
          last_updated_by: "$last_updated_by",
          last_updated_date: "$last_updated_date",
          creation_date: "$creation_date",
          selfAuditPeriod: "$selfAuditPeriod" ,
          hrAuditPeriod: "$hrAuditPeriod" ,
          selfAuditUnit: "$selfAuditUnit" ,
          hrAuditUnit: "$hrAuditUnit" 
        },
      },
    ]).exec();
    if (!assetsc) {
      return response.returnFalse(200, req, res, "No Reord Found...", []);
    }
    res.status(200).send(assetsc)
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};

exports.getSingleAssetCategory = async (req, res) => {
  try {
    const singlesim = await assetsCategoryModel.findOne({
      category_id: parseInt(req.params.category_id),
    });
    if (!singlesim) {
      return response.returnFalse(200, req, res, "No Reord Found...", {});
    }
    return response.returnTrue(
      200,
      req,
      res,
      "Asset Category Data Fetch Successfully",
      singlesim
    );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};

exports.editAssetCategory = async (req, res) => {
  try {
    const editsim = await assetsCategoryModel.findOneAndUpdate(
      { category_id: parseInt(req.body.category_id) },
      {
        category_name: req.body.category_name,
        description: req.body.description,
        created_by: req.body.created_by,
        last_updated_by: req.body.last_updated_by,
        last_updated_date: req.body.last_updated_date,
        selfAuditPeriod: req.body.selfAuditPeriod ,
        hrAuditPeriod: req.body.hrAuditPeriod ,
        selfAuditUnit: req.body.selfAuditUnit ,
        hrAuditUnit: req.body.hrAuditUnit ,
      },
      { new: true }
    );
    if (!editsim) {
      return response.returnFalse(
        200,
        req,
        res,
        "No Reord Found With This Asset Category Id",
        {}
      );
    }
    return response.returnTrue(200, req, res, "Updation Successfully", editsim);
  } catch (err) {
    if (err.code === 11000) {
      // The error code 11000 indicates a duplicate key error (unique constraint violation)
      return response.returnFalse(500, req, res, "Category name must be unique. Another category with the same name already exists.'", {});

    } else {
      return response.returnFalse(500, req, res, err.message, {});
    }
  }
};

exports.deleteAssetCategory = async (req, res) =>{
    assetsCategoryModel.deleteOne({category_id:req.params.category_id}).then(item =>{
      if(item){
          return res.status(200).json({success:true, message:'Asset Category deleted'})
      }else{
          return res.status(404).json({success:false, message:'Asset Category not found'})
      }
  }).catch(err=>{
      return res.status(400).json({success:false, message:err})
  })
};

exports.getAssetSubCategoryCount = async (req, res) => {
  try {
    const category = await assetsCategoryModel.findOne({
      category_id: parseInt(req.params.category_id),
    });

    if (!category) {
      return response.returnFalse(200, req, res, "No Record Found...", {});
    }

    const subCategories = await assetsSubCategoryModel.find({
      category_id: parseInt(req.params.category_id),
    });

    const subCategoryCount = subCategories.length;

    const result = {
      sub_categories: subCategories,
      sub_category_count: subCategoryCount,
    };

    return response.returnTrue(
      200,
      req,
      res,
      "Asset Category Data Fetch Successfully",
      result
    );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};

