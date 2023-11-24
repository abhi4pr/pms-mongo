const swaggerAccessModel = require("../../models/swaggerDocumentation/swaggerAccessModel");
const devLoginHistoryModel = require("../../models/swaggerDocumentation/devLoginHistoryModel");
const constant = require("../../common/constant");
const jwt = require("jsonwebtoken");
const response = require("../../common/response");

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

exports.devLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await swaggerAccessModel.findOne({ email });

    if (!userData) {
      return response.returnFalse(200, req, res, "Access Denied...", {});
    }

    if (userData.status !== "Active") {
      return response.returnFalse(
        200,
        req,
        res,
        "Your account is currently inactive. Please contact your manager for authorization prior to accessing the documentation.",
        {}
      );
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
      token
    });

    const savedLoginHistory = await loginHistory.save();

    // res.set("Authorization", `Bearer ${token}`);
    res.redirect(`/api-docs/${token}`);
    // return response.returnTrue(
    //   200,
    //   req,
    //   res,
    //   "Login Successfully",
    //   savedLoginHistory
    // );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
