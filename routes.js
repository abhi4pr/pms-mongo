const express = require('express');
const router = express.Router();
const insta = require('./controllers/insta.js');
const exe = require('./controllers/execution.js');
const sim = require('./controllers/sim.js');

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

module.exports = router;