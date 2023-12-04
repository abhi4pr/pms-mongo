const swaggerAccessModel = require("../models/swaggerAccessModel");
const devLoginHistoryModel = require("../models/devLoginHistoryModel");
const constant = require("../../../common/constant");
const sendMail = require("../../../common/sendMail");
const jwt = require("jsonwebtoken");
const response = require("../../../common/response");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const helper = require("../../../helper/helper");

/* Admin Api's */
exports.addDevData = async (req, res) => {
  try {
    const { email, phone, name, status, department,password } = req.body;
    let encryptedPass = await bcrypt.hash(password, 10);
    const devData = new swaggerAccessModel({
      email,
      phone,
      name,
      status,
      department,
      isAdminVerified : 1,
      password : encryptedPass
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
    let isAdminVerified = req.params.isAdminVerified
    const savedDevData = await swaggerAccessModel
      .find({ role: constant.SWAGGER_DEVELOPER, isAdminVerified })
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
    let page  = req.params.page
    let url = page == 1 ? "/doc-user" : "/all-request"
    const user = await swaggerAccessModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.render("swaggerErrorTemplate", {
        error_title: "No record found..",
        error_description: "",
        error_image:
          "https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-9952946-8062130.png?f=webp",
        button_path: `${url}/${req.params.token}`,
        button_text: "Back",
      });
    }
    return res.redirect(`${url}/${req.params.token}`);
  } catch (err) {
    return res.render("swaggerErrorTemplate", {
      error_title: "Internal Server Error.",
      error_description: err.message,
      error_image:
        "https://img.freepik.com/premium-photo/http-error-500-internal-server-error-3d-render-illustration_567294-2973.jpg?w=360",
        button_path: `${url}/${req.params.token}`,
      button_text: "Back",
    });
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
    if(!bcrypt.compareSync(req.body.password, userData.password)){
      return res.render("swaggerErrorTemplate", {
        error_title: "Password Invalid...",
        error_description: "",
        error_image:
          "https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-9952946-8062130.png?f=webp",
        button_path: "/doc-login",
        button_text: "Return to Login",
      });
    }
    if (userData.isAdminVerified === 0 && userData.role !== constant.ADMIN_ROLE) {
      return res.render("swaggerErrorTemplate", {
        error_title: "Your id is pending for verification.",
        error_description:
          "Please contact your manager for authorization prior to accessing the documentation.",
        error_image:
          "https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-9952943-8062127.png?f=webp",
        button_path: "/doc-login",
        button_text: "Return to Login",
      });
    }
    if (userData.status !== "Active" && userData.role !== constant.ADMIN_ROLE) {
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
exports.addDevRequest = async (req, res) => {
  try {
    const { email, phone, name,department, password } = req.body;

    const userData = await swaggerAccessModel.findOne({ email });

    if (userData) {
      if(userData.isAdminVerified === 1){
        return res.render("swaggerErrorTemplate", {
          error_title: "Your previous request already approved.",
          error_description: "You can not request again if your request approved from administrator.",
          error_image:
            "https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-9952946-8062130.png?f=webp",
          button_path: "/doc-login",
          button_text: "Return to Login",
        });
      }else if ( userData.isAdminVerified === 0){
        return res.render("swaggerErrorTemplate", {
          error_title: "Already Requested.",
          error_description: "Your previous request is pending for approval.",
          error_image:
            "https://png.pngtree.com/png-vector/20190726/ourlarge/pngtree-package-pending-icon-for-your-project-png-image_1599195.jpg",
          button_path: "/doc-login",
          button_text: "Return to Login",
        });
      }
      
    }
    const devReq = new swaggerAccessModel({
      email,
      phone,
      name,
      department,
      password
    });

    const savedDevReq = await devReq.save();
    
    if (savedDevReq) {
      const templatePath = path.join(__dirname, `../../templates/devInvationSend.ejs`);
    const template = await fs.promises.readFile(templatePath, "utf-8");
      
    const html = ejs.render(template, {
      name,
     
    })
    //Send Mail with Template
    sendMail("Jarvis Api Documentation", html,email);
    return res.render("swaggerErrorTemplate", {
      error_title: "Email sent on your account please verifed",
      error_description: "Email verification is required for further process.",
      error_image:
        "https://www.pngitem.com/pimgs/m/423-4236284_png-images-success-icon-png-transparent-png-download.png",
      button_path: "/doc-login",
      button_text: "Return to Login",
    });
    } else {
      return res.render("swaggerErrorTemplate", {
        error_title: "Something went wrong.",
        error_description: "There is internal issue.",
        error_image:
          "https://img.freepik.com/premium-photo/http-error-500-internal-server-error-3d-render-illustration_567294-2973.jpg?w=360",
        button_path: "/admin-request",
        button_text: "Back",
      });
    }
  } catch (err) {
    return res.render("swaggerErrorTemplate", {
      error_title: "Internal Server Error.",
      error_description: err.message,
      error_image:
        "https://img.freepik.com/premium-photo/http-error-500-internal-server-error-3d-render-illustration_567294-2973.jpg?w=360",
        button_path: "/admin-request",
        button_text: "Back",
    });
  }
};
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const userData = await swaggerAccessModel.findOne({ email });
    if (!userData) {
      return res.render("swaggerErrorTemplate", {
        error_title: "Access Denied, Please provide valid email",
        error_description: "",
        error_image:
          "https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-9952946-8062130.png?f=webp",
          button_path: "/otp-verify",
          button_text: "Back",
      });
    }

    if (userData.otpExpired && parseInt(userData.otpExpired) < new Date().getTime()) {
      return res.render("swaggerErrorTemplate", {
        error_title: "Otp Expired.",
        error_description: "Otp only valid for 10 Minutes, Your otp has been expired.",
        error_image:
          "https://cdn-icons-png.flaticon.com/512/3133/3133158.png",
          button_path: "/dev-forgot",
          button_text: "Back",
      });
    }

    if( userData.otp && userData.otp !== otp){
      return res.render("swaggerErrorTemplate", {
        error_title: "Invalid Otp",
        error_description: "Please provide valid otp.",
        error_image:
          "https://cdni.iconscout.com/illustration/premium/thumb/verification-failed-6853778-5639902.png",
        button_path: "/otp-verify",
        button_text: "Back",
      });
    }

    return res.redirect(`/reset-password`);
  
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
exports.otpSend = async (req, res) => {
  try {
    
    const { email } = req.body;

    const userData = await swaggerAccessModel.findOne({ email });
    if (!userData) {
      return res.render("swaggerErrorTemplate", {
        error_title: "Access Denied, Please provide valid email",
        error_description: "",
        error_image:
          "https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-9952946-8062130.png?f=webp",
        button_path: "/doc-login",
        button_text: "Return to Login",
      });
    }

   await swaggerAccessModel.findByIdAndUpdate(userData._id,{
      $set:{
        otp  : helper.generateRandomOTP(),
        otpExpired : helper.generateOtpExpiryTime()
      }
    })

    return res.redirect('/otp-verify')

  } catch (err) {
    return res.render("swaggerErrorTemplate", {
      error_title: "Internal Server Error.",
      error_description: err.message,
      error_image:
        "https://img.freepik.com/premium-photo/http-error-500-internal-server-error-3d-render-illustration_567294-2973.jpg?w=360",
        button_path: "/doc-login",
        button_text: "Return to login",
    });
  }
};
exports.updatePassword = async(req,res)=>{
  try {
    let password = req.body.password
      let encryptedPass = await bcrypt.hash(password, 10);
     let savedDevData = await swaggerAccessModel.findOneAndUpdate(
      { email: req.body.email},
        {
          $set: {
            password : encryptedPass
          },
        }
      );
      if (!savedDevData) {
        return res.render("swaggerErrorTemplate", {
          error_title: "No Record Found",
          error_description: "",
          error_image:
            "https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-9952946-8062130.png?f=webp",
          button_path: "/doc-login",
          button_text: "Return to Login",
        });
      }
      return res.render("swaggerErrorTemplate", {
        error_title: "Password Reset Successfully.",
        error_description:"",
        error_image:
          "https://t3.ftcdn.net/jpg/04/75/01/24/360_F_475012493_x7oLL5mrWTm25OCRluB2fZkn0onfSEqu.jpg",
          button_path: "/doc-login",
          button_text: "Return to login",
      });
  } catch (error) {
    return res.render("swaggerErrorTemplate", {
      error_title: "Internal Server Error.",
      error_description: error.message,
      error_image:
        "https://img.freepik.com/premium-photo/http-error-500-internal-server-error-3d-render-illustration_567294-2973.jpg?w=360",
        button_path: "/doc-login",
        button_text: "Return to login",
    });
  }
}