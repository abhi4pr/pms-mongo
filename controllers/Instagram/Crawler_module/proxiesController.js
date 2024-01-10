const response = require("../../../common/response");
const proxyModel = require("../../../models/Instagram/proxiesModel");

exports.addProxyIps = async (req, res) => {
  try {
    const {
      proxy,
      status,
      blockedTime,
      createdBy,
      updatedby,
    } = req.body;

    const proxyData = new proxyModel({
      proxy,
      status,
      blockedTime,
      createdBy,
      updatedby
    });

    const savedProxyData = await proxyData.save();

    return response.returnTrue(
      200,
      req,
      res,
      "Data Created Successfully",
      savedProxyData
    );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
exports.InsertMultipleRecords =  async (req, res) => {
    try {
      const proxyDataArray = req.body.proxyDataArray; // Assuming req.body is an array of proxy data
  
      // Validate the array to ensure it is an array of valid proxy data objects
  
      const resultArray = await Promise.allSettled(
        proxyDataArray.map(async (proxyData) => {
          try {
            const savedProxyData = await proxyModel.create(proxyData);
            return { status: 'fulfilled', value: savedProxyData };
          } catch (error) {
            return { status: 'rejected', reason: error.message };
          }
        })
      );
  
      const successfulCreations = resultArray
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value);
  
      const failedCreations = resultArray
        .filter((result) => result.status === 'rejected')
        .map((result) => result.reason);
  
      return response.returnTrue(
        200,
        req,
        res,
        "Data Created Successfully",
        { successfulCreations, failedCreations }
      );
    } catch (err) {
      return response.returnFalse(500, req, res, err.message, {});
    }
  };

exports.getProxyIp = async (req, res) => {
  try {
    const proxydata = await proxyModel.find();
    if (proxydata.length === 0) {
      return response.returnFalse(200, req, res, "No record found", []);
    } else {
      return response.returnTrue(
        200,
        req,
        res,
        "Data Fetch Successfully",
        proxydata
      );
    }
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
exports.getSingleProxyIp = async (req, res) => {
  try {
    const proxydata = await proxyModel.findById(req.params.id);
    if (!proxydata) {
      return response.returnFalse(200, req, res, "No record found", {});
    } else {
      return response.returnTrue(
        200,
        req,
        res,
        "Data Fetch Successfully",
        proxydata
      );
    }
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
exports.editProxyIp = async (req, res) => {
  try {
    const editProxyObj = await proxyModel.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );

    if (!editProxyObj) {
      return response.returnFalse(200, req, res, "No record found");
    }

    return response.returnTrue(
      200,
      req,
      res,
      "Data Update Successfully",
      editProxyObj
    );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
exports.deleteProxyIp = async (req, res) => {
  try {
    const result = await proxyModel.findByIdAndDelete(req.params.id);
    if (result) {
      return response.returnTrue(
        200,
        req,
        res,
        `Proxy Ip with ID ${req.params?.id} deleted successfully.`
      );
    } else {
      return response.returnFalse(
        200,
        req,
        res,
        `Proxy Ip with ID ${req.params?.id} not found.`
      );
    }
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
exports.deleteBasedOnCondition = async (req, res) => {
  try {
    let matchCondition = req.body.matchCodition
    const result = await proxyModel.deleteMany(matchCondition);

    if (result?.deletedCount > 0) {
      return response.returnTrue(
        200,
        req,
        res,
        `Proxy deleted successfully Deleted Count ${result?.deletedCount }.`
      );
    } else {
      return response.returnFalse(
        200,
        req,
        res,
        `No Proxies found with perticular condition.`
      );
    }
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};
