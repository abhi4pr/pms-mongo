const { BrandRouteDoc } = require("../apis/brandDoc");
const { projectxCategoryDoc } = require("../apis/projectxCategoryDoc");
const { billingHeaderDoc } = require("../apis/billingHeaderDoc");
const { projectxPageCategoryDoc } = require("../apis/projectxPageCategoryDoc");
const { projectxSubCategoryDoc } = require("../apis/projectxSubCategoryDoc");
const registerCmp = require("../apis/registerCampaignDoc");

const mainSchema = {
  ...BrandRouteDoc,
  ...registerCmp,
  ...billingHeaderDoc,
  ...projectxCategoryDoc,
  ...projectxSubCategoryDoc,
  ...projectxPageCategoryDoc,
};
module.exports = mainSchema;
