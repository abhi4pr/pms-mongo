const {
  addCronForCreator,
  editCronForCreator,
  getCronForCreator,
  getSingleCronForCreator,
  deleteCronForCreator,
} = require("../../../controllers/Instagram/Crawler_module/creatorCronController");
const express = require("express");
const cronRouter = express.Router();

cronRouter.post("/add_creator_cron", addCronForCreator);
cronRouter.put("/edit_creator_cron", editCronForCreator);
cronRouter.get("/get_all_creator_crons", getCronForCreator);
cronRouter.get("/get_single_creator_crons/:id", getSingleCronForCreator);
cronRouter.delete("/delete_creator_cron/:id", deleteCronForCreator);

module.exports = cronRouter;
