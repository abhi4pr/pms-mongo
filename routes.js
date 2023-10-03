const express = require("express");
const router = express.Router();
const insta = require('./controllers/insta.js');
const exe = require('./controllers/execution.js');
const sim = require('./controllers/sim.js');
const logoBrand = require('./controllers/logoBrand.js');
const department = require('./controllers/department.js');
const brand = require("./controllers/brand.js");
const campagin = require("./controllers/campaign.js");
const projectxPageCategory = require("./controllers/projectxPageCategory.js");
const projectxSubCategory = require("./controllers/projectxSubCategory.js");
const hashTag = require("./controllers/hashTag.js");
const projectxCategory = require("./controllers/projectxCategory.js");
const registerCampaign = require("./controllers/registerCampaign.js");
const { upload } = require("./common/uploadFile.js");
const designation = require('./controllers/designation.js');

  router.get("/", (req, res) => {
    res.send({ message: "Welcome to my application." });
  });

  /*insta api*/
  router.post("/track_creator_post", insta.trackCreator);
  router.get("/instagetcreators", insta.getCreators);
  router.post("/track_creator_posty", insta.trackCreatorY);
  router.post("/track_post_post", insta.trackPost);
  router.get("/instagetposts", insta.getPosts);
  router.post("/track_post_posty", insta.trackPostY);
  router.post("/track_story_post", insta.trackStory);
  router.put("/instaupdate", insta.editInsta);
  router.get("/post_type_dec_count", insta.postTypeDecCount);
  router.get("/creator_name_count", insta.creatorNameCount);
  router.post("/get_posts_from_name", insta.getPostsFromName);
  router.get("/creator_insights", insta.creatorInsights);
  /*execution api*/
  router.post("/exe_inven_post", exe.exeInvenPost);
  router.get("/get_exe_inventory", exe.getExeInventory);
  router.post("/exe_sum_post", exe.exeSumPost);
  router.get("/get_exe_sum", exe.getExeSum);
  router.put("/edit_exe_sum", exe.editExeSum);

  /*sim api*/
  router.get("/get_sims", sim.getSims);
  router.post("/add_sim", sim.addSim);
  router.get("/get_single_sim/:id", sim.getSingleSim);
  router.put("/edit_sim", sim.editSim);
  router.delete("/delete_sim/:id", sim.deleteSim);
  router.post("/add_sim_allocation", sim.addAllocation);
  router.get("/get_allocations", sim.getAllocations);
  router.put("/edit_allocation_sim", sim.editAllocation);
  router.delete("/delete_allocation/:id", sim.deleteAllocation);

  /* logo brand */
  router.post("/add_logo_brand", logoBrand.addLogoBrand);
  router.get("/get_logo_brands", logoBrand.getLogoBrands);
  router.get("/get_single_logobrand/:id", logoBrand.getSingleLogoBrand);
  router.put("/edit_logo_brand", logoBrand.editLogoBrand);
  router.delete("/delete_logo_brand/:id", logoBrand.deleteLogoBrand);

  /* department */
  router.post("/add_department", department.addDepartment);
  router.get("/get_department", department.getDepartments);
  router.get("/get_single_department/:id", department.getSingleDepartment);
  router.put("/edit_department", department.editDepartment);
  router.delete("/delete_department/:id", department.deleteDepartment);

  /* sub department */
  router.post("/add_sub_department", department.addSubDepartment);
  router.put("/edit_sub_department", department.editSubDepartment);
  router.delete("/delete_sub_department/:id", department.deleteSubDepartment);
  router.get("/get_subdept_from_dept/:id", department.getSubDepartmentsFromDeptId);
  router.get("/get_subdept_from_id/:id", department.getSubDepartmentsFromId);

  /* designation */
  router.post("/add_designation", designation.addDesignation);
  router.put("/edit_designation", designation.editDesignation);
  router.delete("/delete_designation/:id", designation.deleteDesignation);
  router.get("/get_designations", designation.getDesignations);

  //brand routes
  router.post("/add_brand", brand.addBrand);
  router.get("/get_brands", brand.getBrands);
  router.get("/get_brand/:id", brand.getBrandById);
  router.put("/edit_brand", brand.editBrand);
  router.delete("/delete_brand/:id", brand.deleteBrand);

  //Campaign routes
  router.post("/campaign", campagin.addCampaign);
  router.get("/campaign", campagin.getCampaigns);
  router.get("/campaign/:id", campagin.getCampaignById);
  router.put("/campaign", campagin.editCampaign);
  router.delete("/campaign/:id", campagin.deleteCampaign);

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
  router.get(
    "/register_campaign",
    registerCampaign.getRegisterCampaigns
  );

//Hash Tag
router.post("/hash_tag",hashTag.addHashTag)
router.get("/hash_tag",hashTag.getHashTags)
router.put("/hash_tag_edit",hashTag.editHashTag)
router.delete("/hash_tag/:id",hashTag.deleteHashTag)

//Projectx Category
router.post("/projectxCategory",projectxCategory.addProjectxCategory)
router.get("/projectxCategory",projectxCategory.getProjectxCategory)
router.get("/projectxCategory/:id",projectxCategory.getProjectxCategoryById)
router.put("/projectxCategory",projectxCategory.editProjectxCategory)
router.delete("/projectxCategory/:id",projectxCategory.deleteProjectxCategory)


module.exports = router;
