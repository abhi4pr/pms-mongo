const express = require("express");
const {
  addProxyIps,
  editProxyIp,
  getProxyIp,
  getSingleProxyIp,
  deleteProxyIp,
  InsertMultipleRecords,
  deleteBasedOnCondition,
} = require("../../../controllers/Instagram/Crawler_module/proxiesController");
const proxyRouter = express.Router();

proxyRouter.post("/add_proxy", addProxyIps);
proxyRouter.post("/add_multiple_proxy", InsertMultipleRecords);
proxyRouter.put("/edit_proxy", editProxyIp);
proxyRouter.get("/get_all_proxy", getProxyIp);
proxyRouter.get("/get_single_proxy/:id", getSingleProxyIp);
proxyRouter.delete("/delete_proxy/:id", deleteProxyIp);
proxyRouter.post("/delete_proxy_based_on_condition", deleteBasedOnCondition);

module.exports = proxyRouter;
