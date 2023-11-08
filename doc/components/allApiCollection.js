const { brandApis } = require("../apis/brandDoc");
const { projectxCategoryApis } = require("../apis/projectxCategoryDoc");
const { billingHeaderApis } = require("../apis/billingHeaderDoc");
const { projectxPageCategoryApis } = require("../apis/projectxPageCategoryDoc");
const { projectxSubCategoryApis } = require("../apis/projectxSubCategoryDoc");
const { brandCategoryApis } = require("../apis/brandCategoryDoc");
const { registerCmpApis } = require("../apis/registerCampaignDoc");

const mainSchema = {
  ...brandApis,
  ...brandCategoryApis,
  ...registerCmpApis,
  ...billingHeaderApis,
  ...projectxCategoryApis,
  ...projectxSubCategoryApis,
  ...projectxPageCategoryApis,
};
module.exports = mainSchema;
