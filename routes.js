const express = require("express");
const router = express.Router();
const insta = require("./controllers/insta.js");
const exe = require("./controllers/execution.js");
const sim = require("./controllers/sim.js");
const logoBrand = require("./controllers/logoBrand.js");
const department = require("./controllers/department.js");
const brand = require("./controllers/brand.js");
const campagin = require("./controllers/campaign.js");
const projectxPageCategory = require("./controllers/projectxPageCategory.js");
const projectxSubCategory = require("./controllers/projectxSubCategory.js");
const hashTag = require("./controllers/hashTag.js");
const projectxCategory = require("./controllers/projectxCategory.js");
const projectxRecord = require("./controllers/projectxRecord.js");
const registerCampaign = require("./controllers/registerCampaign.js");
const contentSectionReg = require("./controllers/contentSectionRegCmp.js");
const contentType = require("./controllers/contentType.js");
const projectx = require("./controllers/projectx.js");
const announcement = require("./controllers/announcement.js");
const objectMast = require("./controllers/objmast.js");
const { upload, upload1 } = require("./common/uploadFile.js");
const designation = require("./controllers/designation.js");
const finance = require("./controllers/finance.js");
const sitting = require("./controllers/sitting.js");
const agency = require("./controllers/agency.js");
const responsibility = require("./controllers/responsibility.js");
const contentM = require("./controllers/contentManagement.js");
const billingheader = require("./controllers/billingheader.js");
const brandCategory = require("./controllers/brandCategory.js");
const brandSubCategory = require("./controllers/brandSubCategory.js");
const productController = require("./controllers/product.js");
const brandMajorCategory = require("./controllers/brandMajorCategory.js");
const cmtController = require("./controllers/commitmentMast.js");
const exeCampaign = require("./controllers/exeCampaign.js");
const instaBrand = require("./controllers/instaBrand.js");
const user = require("./controllers/user.js");
const attendance = require("./controllers/attendance.js");
const instapage = require("./controllers/instaPage.js");

const role = require("./controllers/role.js");
const kra = require("./controllers/kra.js");
const leadremark = require("./controllers/leadRemark.js");
const lead = require("./controllers/lead.js");
const leadtype = require("./controllers/lead.js");
const leadmast = require("./controllers/lead.js");
const { verifyToken } = require("./middleware/auth.js");

router.get("/", (req, res) => {
  res.send({ message: "Welcome to my application." });
});

/*insta api*/
router.post("/track_creator_post", insta.trackCreator);
router.get("/instagetcreators", insta.getCreators);
router.post("/track_creator_posty", insta.trackCreatorY);
router.put("/track_creator_puty/:pagename", insta.trackCreatorPutY);
router.post("/track_post_post", insta.trackPost);
router.get("/instagetposts", insta.getPosts);
router.post("/track_post_posty", insta.trackPostY);
router.post("/track_story_post", insta.trackStory);
router.put("/instaupdate", insta.editInsta);
router.get("/post_type_dec_count", insta.postTypeDecCount);
router.post("/creator_name_count", insta.creatorNameCount);
router.post("/get_posts_from_name", insta.getPostsFromName);
router.get("/creator_insights", insta.creatorInsights);
router.get("/cfinstaapi", insta.cfInstaApi);
router.get("/countinstacp", insta.countInstaCPModels);
router.post("/get_all_posts_by_id", insta.getPostsByDecNum)
/*execution api*/
router.post("/exe_inven_post", exe.exeInvenPost);
router.get("/get_exe_inventory", exe.getExeInventory);
router.post("/exe_sum_post", exe.exeSumPost);
router.get("/get_exe_sum", exe.getExeSum);
router.put("/edit_exe_sum", exe.editExeSum);

/*sim api*/
router.get("/get_all_sims",  sim.getSims);
router.post("/add_sim",  sim.addSim);
router.get("/get_single_sim/:id",  sim.getSingleSim);
router.put("/update_sim",  sim.editSim);
router.delete("/delete_sim/:id",  sim.deleteSim);
router.post("/add_sim_allocation",  sim.addAllocation);
router.get("/get_all_allocations",  sim.getAllocations);
router.put("/update_allocationsim",  sim.editAllocation);
router.delete("/delete_allocation/:id",  sim.deleteAllocation);

/* logo brand */
router.post("/add_logo_brand",  logoBrand.addLogoBrand);
router.get("/get_all_logo_brands",  logoBrand.getLogoBrands);
router.get(
  "/get_single_logobrand/:id",
  
  logoBrand.getSingleLogoBrand
);
router.put("/update_logo_brand",  logoBrand.editLogoBrand);
router.delete("/delete_logo_brand/:id",  logoBrand.deleteLogoBrand);

/* department */
router.post("/add_department",  department.addDepartment);//Done
router.get("/get_all_departments",  department.getDepartments);//Done
router.get(
  "/get_single_department/:id",
  
  department.getSingleDepartment
);//not used
router.put("/update_department",  department.editDepartment);//Done
router.delete(
  "/delete_department/:id",
  department.deleteDepartment
);//Done

/* sub department */
router.post("/add_sub_department",  department.addSubDepartment);//Done
router.get("/get_all_sub_departments",  department.getSubDepartments);//Done
router.put("/update_sub_department",  department.editSubDepartment);//Done
router.delete(
  "/delete_sub_department/:id",
  
  department.deleteSubDepartment
);//Done
router.get(
  "/get_subdept_from_dept/:dept_id",
  
  department.getSubDepartmentsFromDeptId
);//Done
router.get(
  "/get_subdept_from_id/:id",
  
  department.getSubDepartmentsFromId
);//Done

/* designation */
router.post("/add_designation",  designation.addDesignation);//Done
router.put("/update_designation",  designation.editDesignation);//Done
router.get(
  "/get_single_designation/:desi_id",
  designation.getSingleDesignation
);//Done
router.delete(
  "/delete_designation/:desi_id",
  designation.deleteDesignation
);//Done
router.get("/get_all_designations",  designation.getDesignations);//Done

//brand routes
router.post("/add_brand", brand.addBrand);
router.get("/get_brands", brand.getBrands);
router.get("/check_unique_brand", brand.checkSubCatAndCat);
router.get("/get_brand/:id", brand.getBrandById);
router.put("/edit_brand", brand.editBrand);
router.delete("/delete_brand/:id", brand.deleteBrand);

//Campaign routes
router.post("/campaign", campagin.addCampaign);
router.get("/campaign", campagin.getCampaigns);
router.get("/campaign/:id", campagin.getCampaignById);
router.put("/campaign", campagin.editCampaign);
router.delete("/campaign/:id", campagin.deleteCampaign);

//Execution Campaign routes
router.post("/exe_campaign", exeCampaign.addExeCampaign);
router.get("/exe_campaign", exeCampaign.getExeCampaigns);
router.get("/exe_campaign/:id", exeCampaign.getExeCampaignById);
router.put("/exe_campaign", exeCampaign.editExeCampaign);
router.delete("/exe_campaign/:id", exeCampaign.deleteExeCampaign);

//ProjectxPageCategory
router.post(
  "/projectxpagecategory",
  projectxPageCategory.addProjectxPageCategory
);
router.get(
  "/projectxpagecategory",
  projectxPageCategory.getProjectxPageCategory
);
router.get(
  "/projectxpagecategory/:id",
  projectxPageCategory.getProjectxPageCategoryById
);
router.put(
  "/projectxpagecategory",
  projectxPageCategory.editProjectxPageCategory
);
router.delete(
  "/projectxpagecategory/:id",
  projectxPageCategory.deleteProjectxPageCategory
);

//ProjectxSubCategory
router.post("/projectxSubCategory", projectxSubCategory.addProjectxSubCategory);
router.get("/projectxSubCategory", projectxSubCategory.getProjectxSubCategory);
router.get(
  "/projectxSubCategory/:id",
  projectxSubCategory.getProjectxSubCategoryById
);
router.put("/projectxSubCategory", projectxSubCategory.editProjectxSubCategory);
router.delete(
  "/projectxSubCategory/:id",
  projectxSubCategory.deleteProjectxSubCategory
);

//Register Campaign
router.post(
  "/register_campaign",
  upload.single("excel_file"),
  registerCampaign.addRegisterCampaign
);
router.get("/register_campaign", registerCampaign.getRegisterCampaigns);
router.put("/register_campaign", registerCampaign.editRegisterCampaign);
router.delete("/register_campaign/:id", registerCampaign.deleteRegisterCmp);

//Hash Tag
router.post("/hash_tag",  hashTag.addHashTag);
router.get("/hash_tag",  hashTag.getHashTags);
router.put("/hash_tag_edit",  hashTag.editHashTag);
router.delete("/hash_tag/:id",  hashTag.deleteHashTag);

//Projectx Category
router.post("/projectxCategory", projectxCategory.addProjectxCategory);
router.get("/projectxCategory", projectxCategory.getProjectxCategory);
router.get("/projectxCategory/:id", projectxCategory.getProjectxCategoryById);
router.put("/projectxCategory", projectxCategory.editProjectxCategory);
router.delete("/projectxCategory/:id", projectxCategory.deleteProjectxCategory);

//Projectx
router.post("/projectxpost", projectx.addProjectx);
router.get("/getallprojectx", projectx.getProjectx);
router.post("/getprojectx", projectx.getProjectxByPageName);
router.put("/projectxupdate", projectx.editProjectx);
router.delete("/projectxdelete/:id", projectx.deleteProjectx);

//Projectx Record
router.post("/projectxRecord", projectxRecord.addProjectxRecord);
router.get("/projectxRecord", projectxRecord.getProjectxRecords);
router.put("/projectxRecord", projectxRecord.editProjectxRecord);
router.delete("/projectxRecord/:id", projectxRecord.deleteProjectxRecord);

//Register Campaign Content Section
router.post(
  "/contentSectionReg",
  upload.fields([
    { name: "content_sec_file", maxCount: 10 },
    { name: "cmpAdminDemoFile", maxCount: 1 },
  ]),

  contentSectionReg.addContentSectionReg
);
router.get("/contentSectionReg", contentSectionReg.getContentSectionReg);
router.put(
  "/contentSectionReg",
  upload.fields([
    { name: "content_sec_file", maxCount: 5 },
    { name: "cmpAdminDemoFile", maxCount: 1 },
  ]),
  contentSectionReg.editContentSectionReg
);

// Content Type
router.post("/content", contentType.addContentType);
router.get("/content", contentType.getContentTypes);
router.get("/content/:id", contentType.getContentTypeById);
router.put("/content", contentType.editContentType);
router.delete("/content/:id", contentType.deleteContentType);

/* finance */
router.post(
  "/add_finance",
  
  upload.single("screenshot"),
  finance.addFinance
);
router.get("/get_finances",  finance.getFinances);
router.put(
  "/edit_finance",
  
  upload.single("screenshot"),
  finance.editFinance
);
router.delete("/delete_finance",  finance.deleteFinance);

/* Sitting Routes */
router.post("/add_sitting",  sitting.addSitting);
router.get("/get_all_sittings",  sitting.getSittings);
router.get("/get_single_sitting/:id",  sitting.getSingleSitting);
router.put("/update_sitting",  sitting.editSitting);
router.delete("/delete_sitting/:id",  sitting.deleteSitting);

/* Agency Routes */
router.post("/add_agency", agency.addAgency);
router.get("/get_all_agencys", agency.getAgencys);
router.get("/get_single_agency/:id", agency.getAgencyById);
router.put("/update_agency", agency.editAgency);
router.delete("/delete_agency/:id", agency.deleteAgency);

/* Object Mast */
router.post("/add_obj",  objectMast.addObjectMast);
router.get("/get_all_objs",  objectMast.getObjectMasts);
router.get("/objdata/:id",  objectMast.getObjectMastById);

/* role */
router.post("/add_role",  role.addRole);
router.get("/get_all_roles",  role.getRoles);
router.put("/update_role",  role.editRole);
router.delete("/delete_role/:role_id",  role.deleteRole);

/* Announcement */
router.post("/add_annomastpost",  announcement.addAnnouncement);
router.get(
  "/get_all_announcementdatas",
  
  announcement.getAnnouncements
);
router.get(
  "/get_single_announcement/:id",
  
  announcement.getAnnoncementById
);
router.delete(
  "/delete_annomastdelete/:id",
  
  announcement.deleteAnnoncement
);
router.put("/update_annomastput",  announcement.editAnnoncement);

/* job responsibility */
router.post(
  "/add_job_responsibility",
  
  responsibility.addJobResponsibility
);
router.get(
  "/get_all_jobresponsibilitys",
  
  responsibility.getJobResposibilities
);
router.get(
  "/get_single_jobresponsibility/:id",
  
  responsibility.getSingleJobResponsibility
);
router.put(
  "/update_jobresponsibility",
  
  responsibility.editJobResponsibility
);
router.delete(
  "/delete_jobresponsibility/:id",
  
  responsibility.deleteJobResponsibility
);

router.post(
  "/add_responsibility",
  
  responsibility.addResponsibility
);
router.get(
  "/get_responsibility",
  
  responsibility.getResposibilities
);
router.get(
  "/get_single_responsibility/:id",
  
  responsibility.getSingleResposibility
);
router.put(
  "/edit_responsibility/:id",
  
  responsibility.editResponsibility
);
router.delete(
  "/delete_responsibility/:id",
  
  responsibility.deleteResponsibility
);

/* Content Management Routes */
router.post("/add_contentMgnt",  contentM.addcontentManagement);
router.get(
  "/get_all_contentMgnts",
  
  contentM.getcontentManagements
);
router.get(
  "/get_single_contentMgnt/:id",
  
  contentM.getContentManagementById
);
router.put("/update_contentMgnt",  contentM.editcontentManagement);
router.delete(
  "/delete_contentMgnt/:id",
  
  contentM.deletecontentManagement
);

/* BillingHeader Routes */
router.post("/add_billingheader",  billingheader.addBillingHeader);
router.get(
  "/get_all_billingheaders",
  
  billingheader.getBillingHeaders
);
router.get(
  "/get_single_billingheader/:id",
  
  billingheader.getBillingHeaderById
);
router.put(
  "/update_billingheader",
  
  billingheader.editBillingHeader
);
router.delete(
  "/delete_billingheader/:id",
  
  billingheader.deleteBillingHeader
);

/* Brand Category */
router.post("/brandCategory", brandCategory.addBrandCategory);
router.get("/brandCategory", brandCategory.getBrandCategorys);
router.get("/brandCategory/:id", brandCategory.getBrandCategoryById);
router.put("/brandCategory", brandCategory.editBrandCategory);
router.delete("/brandCategory/:id", brandCategory.deleteBrandCategory);

/* Brand Sub Category */
router.post("/brandSubCategory", brandSubCategory.addBrandSubCategory);
router.get("/brandSubCategory", brandSubCategory.getBrandSubCategorys);
router.get("/brandSubCategory/:id", brandSubCategory.getBrandSubCategoryById);
router.put("/brandSubCategory", brandSubCategory.editBrandSubCategory);
router.delete("/brandSubCategory/:id", brandSubCategory.deleteBrandSubCategory);

/* Brand Major Category */
router.post("/brandMajorCategory", brandMajorCategory.addBrandMajorCategory);
router.get("/brandMajorCategory", brandMajorCategory.getBrandMajorCategorys);
router.get(
  "/brandMajorCategory/:id",
  brandMajorCategory.getBrandMajorCategoryById
);
router.put("/brandMajorCategory", brandMajorCategory.editBrandMajorCategory);
router.delete(
  "/brandMajorCategory/:id",
  brandMajorCategory.deleteBrandMajorCategory
);

/* Insta Brand */
router.post("/insta_brand", instaBrand.addInstaBrand);
router.get("/insta_brand", instaBrand.getInstaBrands);
router.get("/insta_brand/:id", instaBrand.getInstaBrandById);
router.put("/insta_brand", instaBrand.editInstaBrand);
router.delete("/insta_brand/:id", instaBrand.deleteInstaBrand);

/* user */
router.post("/add_user", user.addUser);
router.put("/update_user",  user.updateUser);
router.get("/get_wfh_user",  user.getWFHUsersByDept);
router.get("/get_all_users",  user.getAllUsers);
router.get("/get_single_user/:id",  user.getSingleUser);
router.delete("/delete_user/:id",  user.deleteUser);
router.post("/add_user_auth",  user.addUserAuth);
router.put("/update_user_auth",  user.updateUserAuth);
router.delete("/delete_user_auth",  user.deleteUserAuth);
router.get("/get_all_user_auth",  user.allUserAuthDetail);
router.post("/login_user", user.loginUser);
router.post("/get_delivery_boy",  user.deliveryBoy);  //done
router.get("/get_delivery_user",  user.deliveryUser);
router.get(
  "/get_single_delivery_boy_by_room/:id",
  
  user.deliveryBoyByRoom
);
router.get(
  "/get_single_user_auth_detail/:id",
  
  user.getSingleUserAuthDetail
);
router.get("/get_user_object_auth",  user.userObjectAuth);
router.post(
  "/add_send_user_mail",
  upload.single("attachment"),
  
  user.sendUserMail
);
router.post(
  "/get_user_job_responsibility",
  
  user.getUserJobResponsibility
);
router.get("/get_user_by_deptid/:id",  user.getUserByDeptId);
router.get("/get_user_other_fields/:id",  user.getUserOtherFields);
router.post(
  "/add_user_other_field",
  
  upload.single("field_value"),
  user.addUserOtherField
);
router.put(
  "/update_user_other_fields/:id",
  
  upload.single("field_value"),
  user.getUserOtherFields
);
router.post("/add_reason",  user.addReason);
router.get("/get_all_reasons",  user.getAllReasons);
router.post("/add_separation",  user.addSeparation);
router.get("/get_all_separations",  user.getAllSeparations);
router.get("/get_single_separation/:id",  user.getSingleSeparation);
router.put("/update_separation",  user.updateSeparation);
router.post(
  "/add_send_mail_all_wfo_user",
  
  upload.single("attachment"),
  user.sendMailAllWfoUser
);
router.get("/get_all_wfh_users",  user.getAllWfhUsers);

/* attendance */
router.post("/add_attendance",  attendance.addAttendance);
router.post(
  "/get_salary_by_id_month_year",
  
  attendance.getSalaryByDeptIdMonthYear
);
router.post("/get_salary_by_filter",  attendance.getSalaryByFilter);
router.post(
  "/get_attendance_by_userid",
  
  attendance.getSalaryByUserId
);
router.get("/get_wfh_user_count",  attendance.countWfhUsers);
router.post(
  "/get_salary_count_by_dept_year",
  
  attendance.getSalaryCountByDeptYear
);
router.get(
  "/get_salary_count_by_year",
  
  attendance.getSalaryCountByYear
);

/* commitement */
router.post("/add_commitment", cmtController.addCmt);
router.put("/update_commitment", cmtController.editCmt);
router.get("/get_all_commitments", cmtController.getCmt);
router.get("/get_single_commitment/:id", cmtController.getCmtById);
router.delete("/delete_commitment/:id", cmtController.deleteCmt);

/* Product */

//Product
router.post(
  "/add_product",
  upload1.single("Product_image"),
  
  productController.addProduct
); //done
router.put(
  "/update_productupdate",
  upload1.single("Product_image"),
  
  productController.editProduct
); //done
router.get(
  "/get_single_productdata/:id",
  
  productController.getProductById
); //done
router.get(
  "/get_all_products",
  
  productController.getProduct
); //done
router.delete(
  "/delete_productdelete/:id",
  
  productController.deleteProductById
); //done
//Product props
router.post("/add_proppost",  productController.addProductProps); //done
router.get(
  "/get_single_propsdata/:product_id",
  
  productController.getProductPropsByProductId
);
router.put(
  "/update_propsdataupdate/:id",
  
  productController.editProductProps
);
router.delete(
  "/delete_propdelete/:id",
  
  productController.deleteProductProp
);

// Order Delivery api's
router.post(
  "/add_orderdelivery",
  
  productController.addOrderDelivery
);
router.get(
  "/get_all_orderdelivery",
  
  productController.getAllOrderDeliveries
);

//Order Req api's
router.post("/add_orderreq",  productController.addOrderReq); //done
router.post(
  "/add_orderrequest",
  
  productController.getOrderReqByOrderId
);
router.put("/update_orderrequest",  productController.editOrderReq);
router.put(
  "/update_statusupdatebymanager",
  
  productController.statusUpdateByManager
);
router.put(
  "/update_orderrequesttransbyman",
  
  productController.statusUpdateByManager
);
router.delete(
  "/delete_orderreqdelete",
  
  productController.deleteOrderReqById
);
router.get("/get_LastOrderId",  productController.getLastOrderId);
router.get(
  "/get_single_deliveredorders/:id",
  
  productController.delivereOrdersById
);
router.get(
  "/get_single_pendingorders/:id",
  
  productController.pendingOrdersById
);
router.post(
  "/add_userorderrequest",
  
  productController.orderRequestsForUser
);
router.get(
  "/get_all_orderreqdata",
  
  productController.allOrderReqData
);
router.get(
  "/get_single_orderreqshistory/:user_id",
  
  productController.orderReqHistory
);
router.post(
  "/add_orderreqs",
  
  productController.getOrderReqsBasedOnFilter
); //done
router.post("/add_transreq",  productController.addTransferReq);
router.get(
  "/get-all_transreq",
  
  productController.getAllTransferReq
);

/* KRA Routes */
router.post("/add_kra",  kra.addKra);
router.get("/get_single_kra/:user_id",  kra.getJobResponById);
router.get("/get_all_kras",  kra.getKras);

/* instapage routes */
router.post("/add_instapage", instapage.addIp);
router.put("/update_instapage", instapage.updateIp);
router.delete("/delete_instapage/:id", instapage.deleteInstaPage);
router.post("/add_platform", instapage.addPlatform);
router.get("/get_all_platforms", instapage.getAllPlatforms);
router.put("/update_platform", instapage.updatePlatform);
router.delete("/delete_platform/:id", instapage.deletePlatform);
router.post("/add_iptype", instapage.addIpType);
router.get("/get_all_iptypes", instapage.getAllIpTypes);
router.post("/add_ipstats", instapage.addIpStats);
router.get("/get_stats", instapage.getStats);
router.get("/get_insta_count_history/:id", instapage.getInstaCountHistory);
router.get("/get_last_insta_count/:id", instapage.getLastInstaCount);
router.post("/add_insta_page_count", instapage.addInstaPageCount);
router.put("/update_iptype", instapage.updateIpType);
router.delete("/delete_iptype/:id", instapage.deleteIpType);
router.get("/get_iptype_byid/:id", instapage.getIpTypeById);
router.get("/get_platform_byid/:id", instapage.getPlatformById);
router.get("/get_instapage_byid/:id", instapage.getInstaPageById);
router.post("/dataforgraph", instapage.dataForGraph);
router.get("/all_data_of_ipregis", instapage.getAllInstaPages);

/* Lead Remark Route */
router.post("/add_leadremark",  leadremark.addLeadRemark);
router.get("/get_all_leadremarks",  leadremark.getLeadRemarks);
router.put("/update_leadremark",  leadremark.editLeadRemark);

/* Lead Route */
router.post("/add_lead",  lead.addLead);
router.get("/get_all_leads",  lead.getLeads);
router.get("/get_single_lead/:lead_id",  lead.getLeadById);
router.put("/update_lead",  lead.editLead);
router.delete("/delete_lead",  lead.deleteLead);

/* Lead Type Route */
router.post("/add_leadtype",  leadtype.addLeadType);
router.get("/get_all_leadtypes",  leadtype.getLeadTypes);
router.put("/update_leadtype",  leadtype.editLeadType);
router.delete("/delete_leadtype",  leadtype.deleteLeadType);

/* Lead Mast Route */
router.post("/add_leadmast",  leadmast.addLeadMast);
router.get("/get_all_leadmasts",  leadmast.getLeadMasts);
router.get(
  "/get_single_leadmast/:leadmast_id",
  
  leadmast.getLeadMastById
);
router.put("/update_leadmast",  leadmast.editLeadMast);
router.delete("/delete_leadmast",  leadmast.deleteLeadMast);

module.exports = router;
