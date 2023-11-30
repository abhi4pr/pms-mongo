const swaggerAccessModel = require("../../models/swaggerDocumentation/swaggerAccessModel");
const devLoginHistoryModel = require("../../models/swaggerDocumentation/devLoginHistoryModel");
const constant = require("../../common/constant");
const sendMail = require("../../common/sendMail");
const jwt = require("jsonwebtoken");
const response = require("../../common/response");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

/* Admin Api's */
exports.addDevData = async (req, res) => {
  try {
    const { email, phone, name, status, department } = req.body;
    const devData = new swaggerAccessModel({
      email,
      phone,
      name,
      status,
      department,
    });

    const savedDevData = await devData.save();
    
    if (savedDevData) {
      const templatePath = path.join(__dirname, `../../templates/devInvationSend.ejs`);
    const template = await fs.promises.readFile(templatePath, "utf-8");
      
    const html = ejs.render(template, {
      name,
     
    })
    //Send Mail with Template
    sendMail("Jarvis Api Documentation", html,email);
      return response.returnTrue(
        200,
        req,
        res,
        "Data Deleted Success.",
        savedDevData
      );
    } else {
      return response.returnFalse(200, req, res, "Something went wrong");
    }
  } catch (err) {
    return response.returnFalse(200, req, res, err.message);
  }
};
exports.updateDevData = async (req, res) => {
  try {
    const savedDevData = await swaggerAccessModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      }
    );
    if (!savedDevData) {
      return response.returnFalse(200, req, res, "No record found.");
    }
    return response.returnTrue(
      200,
      req,
      res,
      "Data update Successfully",
      savedDevData
    );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
exports.getDevData = async (req, res) => {
  try {
    const savedDevData = await swaggerAccessModel
      .find({ role: constant.SWAGGER_DEVELOPER })
      .sort({ _id: -1 });

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
exports.deleteDev = async (req, res) => {
  try {
    const user = await swaggerAccessModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return response.returnFalse(200, req, res, "No record found.");
    }
    return response.returnTrue(200, req, res, "Data Deleted Success.");
  } catch (err) {
    return response.returnFalse(200, req, res, "Internal Server Error.");
  }
};
exports.getDevSingleData = async (req, res) => {
  try {
    const savedDevData = await swaggerAccessModel.findById(req.params.id);
    if (!savedDevData) {
      return response.returnFalse(200, req, res, "No record found.");
    }
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
exports.getDevLoginHis = async (req, res) => {
  try {
    const savedDevLoginData = await devLoginHistoryModel
      .aggregate([
        {
          $lookup: {
            from: "swaggeraccessmodels",
            localField: "dev_id",
            foreignField: "_id",
            as: "devData",
          },
        },
        {
          $unwind : "$devData"
        },
        {
          $project:{
            login_date :1,
            duration :1,
            logout_date :1,
            name :"$devData.name",
            role :"$devData.role",
          }
        }
      ])
      .sort({ _id: -1 });

    return response.returnTrue(
      200,
      req,
      res,
      "Data Created Successfully",
      savedDevLoginData
    );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};

/* Developer Api's */

exports.devLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await swaggerAccessModel.findOne({ email });

    if (!userData) {
      return res.render("swaggerErrorTemplate", {
        error_title: "Access Denied, Please provide valid email.....",
        error_description: "",
        error_image:
          "https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-9952946-8062130.png?f=webp",
        button_path: "/doc-login",
        button_text: "Return to Login",
      });
    }
    if (userData.status !== "Active") {
      return res.render("swaggerErrorTemplate", {
        error_title: "Your account is currently inactive.",
        error_description:
          "Please contact your manager for authorization prior to accessing the documentation.",
        error_image:
          "https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-9952943-8062127.png?f=webp",
        button_path: "/doc-login",
        button_text: "Return to Login",
      });
    }
    const devLoginInfo = await devLoginHistoryModel.findOne({
      dev_id: mongoose.Types.ObjectId(userData._id),
      isLoggedIn: true,
    });
    let savedLoginHistory;
    let token;
    if (!devLoginInfo) {
      const loginHistory = new devLoginHistoryModel({
        dev_id: userData._id,
        isLoggedIn: true,
        login_date : Math.floor(Date.now() / 1000) 
      });
      savedLoginHistory = await loginHistory.save();
      token = jwt.sign(
        {
          dev_id: userData._id,
          login_id: savedLoginHistory?._id,
        },
        constant.SECRET_KEY_DOC_LOGIN,
        { expiresIn: constant.CONST_VALIDATE_SESSION_EXPIRE_DOC }
      );
      await devLoginHistoryModel.findByIdAndUpdate(savedLoginHistory._id, {
        $set: { token: token },
      });
    } else {
      token = devLoginInfo?.token;
    }
    if (userData.role === constant.SWAGGER_ADMIN) {
      return res.redirect(`/doc-user/${token}`);
    }
    res.redirect(`/api-docs/${token}`);
  } catch (err) {
    return res.render("swaggerErrorTemplate", {
      error_title: "Internal Server Error.",
      error_description: err.message,
      error_image:
        "https://img.freepik.com/premium-photo/http-error-500-internal-server-error-3d-render-illustration_567294-2973.jpg?w=360",
      button_path: "/doc-login",
      button_text: "Return to Login",
    });
  }
};
exports.devLogout = async (req, res) => {
  try {
    const authorization = req.params.token;
    const token = authorization.replace("Bearer ", "");
    const decoded = jwt.decode(token, { complete: true });
    let id = decoded.payload.login_id;
    let loginInfo = await devLoginHistoryModel.findById(id);
   
    if (!loginInfo) {
      return response.returnFalse(200, req, res, "No login hostory find.");
    }
    let formatedLoginTime = parseInt(loginInfo.login_date)
    let formatedCurrentTime = Math.floor(Date.now() / 1000);
    let diffInSecound = formatedCurrentTime - formatedLoginTime;

    await devLoginHistoryModel.findByIdAndUpdate(id, {
      $set: {
        isLoggedIn: false,
        logout_date: formatedCurrentTime,
        duration: diffInSecound,
      },
    });
    return response.returnTrue(200, req, res, "Log out Successfully");
  } catch (err) {
    return response.returnFalse(200, req, res, err.message);
  }
};