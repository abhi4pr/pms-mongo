const express = require("express");
const swaggerAccessManagement=require('../controller/swaggerAccessManagement');
const { checkDevAuthentication } = require("../middleware/swaggerMiddleware");
const router = express.Router();

router.post('/doc-login',swaggerAccessManagement.devLogin );
router.post('/send-req',swaggerAccessManagement.addDevRequest );
router.post('/doc-logout/:token',checkDevAuthentication,swaggerAccessManagement.devLogout );
router.post('/add-developer/:token',checkDevAuthentication,swaggerAccessManagement.addDevData );
router.post('/verify-otp',swaggerAccessManagement.verifyOtp );
router.post('/otp-send',swaggerAccessManagement.otpSend );
router.post('/update-password',swaggerAccessManagement.updatePassword );
router.get('/doc-users/:token/:isAdminVerified',checkDevAuthentication,swaggerAccessManagement.getDevData );
router.get('/dev-login-history/:token',checkDevAuthentication,swaggerAccessManagement.getDevLoginHis );
router.get('/dev-data/:id/:token',checkDevAuthentication,swaggerAccessManagement.getDevSingleData );
router.put('/dev-data-update/:id/:token',checkDevAuthentication,swaggerAccessManagement.updateDevData );
router.get('/delete-dev/:id/:token/:page',checkDevAuthentication,swaggerAccessManagement.deleteDev );
router.get('/email-verification/:token',swaggerAccessManagement.emailVerification );
router.get('/update-request-status/:id/:token',swaggerAccessManagement.emailVerification );

module.exports = router;