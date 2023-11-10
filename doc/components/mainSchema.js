const brandSchema = require("../schemas/BrandSchema.js");
const billingSchema = require("../schemas/billingSchema.js");
const projectxCategorySchema = require("../schemas/projectxCategorySchema.js");
const agencySchema = require("../schemas/agencySchema.js");
const announcementSchema = require("../schemas/announcementSchema.js");
const brandCategorySchema = require("../schemas/brandCategorySchema.js");
const brandSubCategorySchema = require("../schemas/brandSubCategorySchema.js");
const campaginCategorySchema = require("../schemas/campaignCategorySchema.js");
const brandMajorCategorySchema = require("../schemas/brandMajaorCategorySchema.js");
const campaignSchema = require("../schemas/campaignSchema.js");
const commitementSchema = require("../schemas/commitmentSchema.js");
const contentManagementSchema = require("../schemas/contentMangmentSchema.js");
const contentRegSecSchema = require("../schemas/contentSecRegSchema.js");
const contentTypeSchema = require("../schemas/contentTypeSchema.js");
const departmentSchema = require("../schemas/departmentSchema.js");
const designationSchema = require("../schemas/designationSchema.js");
const exeCampaignSchema = require("../schemas/executionCampaignSchema.js");
const projectxPageCategorySchema = require("../schemas/projectxPageCategorySchema.js");
const projectxSubCategorySchema = require("../schemas/projectxSubCategorySchema.js");
const registerCampaignSchema = require("../schemas/registerCampaignSchema.js");
const fileUploadSchema = require("../schemas/fileUploadSchema.js");
const financeSchema = require("../schemas/financeSchema.js");
const mainSchema = {
  //Create schema for display schema
  Agency: {
    ...agencySchema,
  },
  Announcement: {
    ...announcementSchema,
  },
  Brand: {
    ...brandSchema,
  },
  Brand_Category: {
    ...brandCategorySchema,
  },
  Brand_Sub_Category: {
    ...brandSubCategorySchema,
  },
  Brand_Major_Category: {
    ...brandMajorCategorySchema,
  },
  Billing_Header: {
    ...billingSchema,
  },
  Campagin_Category: {
    ...campaginCategorySchema,
  },
  Campagin: {
    ...campaignSchema,
  },
  Commitment: {
    ...commitementSchema,
  },
  Content_Management: {
    ...contentManagementSchema,
  },
  Content_Register_Section: {
    ...contentRegSecSchema,
  },
  Content_Type: {
    ...contentTypeSchema,
  },
  Department: {
    ...departmentSchema,
  },
  Designation: {
    ...designationSchema,
  },
  Execution_Campaign: {
    ...exeCampaignSchema,
  },
  Finance: {
    ...financeSchema,
  },
  File_Upload_Schema_For_Content_Section_Reg: {
    ...fileUploadSchema,
  },
  Projectx_Sub_Category: {
    ...projectxSubCategorySchema,
  },
  Projectx_Page_Category: {
    ...projectxPageCategorySchema,
  },
  Projectx_Category: {
    ...projectxCategorySchema,
  },
  Register_Campaign: {
    ...registerCampaignSchema,
  },
};
module.exports = mainSchema;
