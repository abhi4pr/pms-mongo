const jwt = require("jsonwebtoken");
const constant = require("../common/constant");
exports.checkDevAuthentication = async(req, res, next) => {
  const authorizationHeader = req.params.token;
  if (!authorizationHeader) {
    return res.status(200).json({
      Status: "Failed",
      Mesaage: " Access Denied Please pass token in header",
    });
  }

  const token = authorizationHeader.replace("Bearer ", "");
  jwt.verify(token, constant.SECRET_KEY_DOC_LOGIN, (error, payload) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        // await 
        return res.redirect("/loginDoc");
      }
      return res.status(200).json({ Message: "TOKEN UNAUTHORIZED" });
    }
    next();
  });
};
