const express = require('express');
const router = express.Router();
const insta = require('./controllers/insta.js');
const exe = require('./controllers/execution.js');
const sim = require('./controllers/sim.js');
const logoBrand = require('./controllers/logoBrand.js');
const brand = require("./controllers/brand.js");
const campagin = require("./controllers/campaign.js");
const projectxPageCategory = require("./controllers/projectxPageCategory.js");
const projectxSubCategory = require("./controllers/projectxSubCategory.js");

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
  router.post("/delete_sim/:id", logoBrand.addLogoBrand);
  router.get("/get_logo_brands", logoBrand.getLogoBrands);
  router.get("/get_single_logobrand", logoBrand.getSingleLogoBrand);
  router.put("/edit_logo_brand", logoBrand.editLogoBrand);
  router.delete("/delete_logo_brand/:id", logoBrand.deleteLogoBrand);

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
  router.post("/projectxpagecategory",projectxPageCategory.addProjectxPageCategory)
  router.get("/projectxpagecategory",projectxPageCategory.getProjectxPageCategory)
  router.get("/projectxpagecategory/:id",projectxPageCategory.getProjectxPageCategoryById)
  router.put("/projectxpagecategory",projectxPageCategory.editProjectxPageCategory)
  router.delete("/projectxpagecategory/:id",projectxPageCategory.deleteProjectxPageCategory)

  //ProjectxSubCategory
  router.post("/projectxSubCategory",projectxSubCategory.addProjectxSubCategory)
  router.get("/projectxSubCategory",projectxSubCategory.getProjectxSubCategory)
  router.get("/projectxSubCategory/:id",projectxSubCategory.getProjectxSubCategoryById)
  router.put("/projectxSubCategory",projectxSubCategory.editProjectxSubCategory)
  router.delete("/projectxSubCategory/:id",projectxSubCategory.deleteProjectxSubCategory)

module.exports = router;