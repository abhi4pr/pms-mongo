const { brandApis } = require("../apis/brandDoc");
const { projectxCategoryApis } = require("../apis/projectxCategoryDoc");
const { billingHeaderApis } = require("../apis/billingHeaderDoc");
const { projectxPageCategoryApis } = require("../apis/projectxPageCategoryDoc");
const { projectxSubCategoryApis } = require("../apis/projectxSubCategoryDoc");
const { brandCategoryApis } = require("../apis/brandCategoryDoc");
const { registerCmpApis } = require("../apis/registerCampaignDoc");
const { brandMajorCategoryApis } = require("../apis/brandMajorCategoryDoc");
const { brandSubCategoryApis } = require("../apis/brandSubCategoryDoc");
const { campaignApis } = require("../apis/campaignDoc");

const mainSchema = {
  ...brandApis,
  ...brandCategoryApis,
  ...brandMajorCategoryApis,
  ...brandSubCategoryApis,
  ...campaignApis,
  ...registerCmpApis,
  ...billingHeaderApis,
  ...projectxCategoryApis,
  ...projectxSubCategoryApis,
  ...projectxPageCategoryApis,
};
module.exports = mainSchema;
