const express = require('express');
const router = express.Router();
const sim = require('./controllers/sim.js');

  router.get("/", (req, res) => {
    res.send({ message: "Welcome to my application." });
  });
  
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