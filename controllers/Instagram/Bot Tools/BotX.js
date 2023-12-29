const instaPostModel = require("../../../models/instaPModel");
const response = require("../../../common/response");

exports.callBotTools = async (req, res) => {
  try {
    const {} = req.body;
    let data = await instaPostModel.countDocuments({});

    return response.returnTrue(200, req, res, "Success", data);
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
