const express = require("express");
const { createBankDetails, getBankDetails, getAllBankDetails, updateBankDetails, deleteBankDetail } = require("../../controllers/PMS2/bankDetailsController");
const router = express.Router();

router.post("/bank_details", createBankDetails);
router.get("/bank_details/:id", getBankDetails);
router.get("/bank_details", getAllBankDetails);
router.put("/bank_details/:id", updateBankDetails);
router.delete("/bank_details/:id", deleteBankDetail);
router.get("/bank_details", getAllBankDetails);


module.exports = router;
