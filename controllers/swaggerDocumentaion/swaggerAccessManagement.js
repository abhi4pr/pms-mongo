const swaggerAccessModel = require("../../models/swaggerDocumentation/swaggerAccessModel");
const devLoginHistoryModel = require("../../models/swaggerDocumentation/devLoginHistoryModel");
const constant = require("../../common/constant");
const jwt = require("jsonwebtoken");
const response = require("../../common/response");
const ejs = require("ejs");
const path = require("path");
const fs = require('fs');
exports.addDevData = async (req, res) => {
  try {
    const { email, phone, name, status } = req.body;
    const devData = new swaggerAccessModel({
      email,
      phone,
      name,
      status,
    });

    const savedDevData = await devData.save();

    return response.returnTrue(
      200,
      req,
      res,
      "Data Created Successfully",
      savedDevData
    );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
exports.getDevData = async (req, res) => {
  try {
   
    const savedDevData = await swaggerAccessModel.find();

    return response.returnTrue(
      200,
      req,
      res,
      "Data Created Successfully",
      savedDevData
    );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};

exports.devLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const userData =  await swaggerAccessModel.findOne({ email });
   
    if (!userData) {
     return res.render('swaggerErrorTemplate', {
        error_title: "Access Denied, Please provide valid email.....",
        error_description:"",
        error_image:"https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-9952946-8062130.png?f=webp",
        button_path :"/doc-login",
        button_text :"Return to Login"
      });
    }

    if (userData.status !== "Active") {
      return res.render('swaggerErrorTemplate', {
        error_title: "Your account is currently inactive.",
        error_description: "Please contact your manager for authorization prior to accessing the documentation.",
        error_image:"https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-9952943-8062127.png?f=webp",
        button_path :"/doc-login",
        button_text :"Return to Login"
      });
    
    }
    const token = jwt.sign(
      {
        dev_id: userData._id,
      },
      constant.SECRET_KEY_DOC_LOGIN,
      { expiresIn: constant.CONST_VALIDATE_SESSION_EXPIRE_DOC }
    );
    const loginHistory = new devLoginHistoryModel({
      dev_id: userData._id,
      isLoggedIn: true,
      token,
    });

    const savedLoginHistory = await loginHistory.save();
    res.redirect(`/api-docs/${token}`);
  } catch (err) {
    return res.render('swaggerErrorTemplate', {
      error_title: "Internal Server Error.",
      error_description: err.message,
      error_image:"https://img.freepik.com/premium-photo/http-error-500-internal-server-error-3d-render-illustration_567294-2973.jpg?w=360",
      button_path :"/doc-login",
      button_text :"Return to Login"
    });
  }
};
