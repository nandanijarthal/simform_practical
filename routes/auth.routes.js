const express = require('express');
const controller = require("../controllers/auth_controller");
const router = express.Router();
const verifySignUp = require("../middleware/verifySignUp");

// router.post('/forgot_password', controller.forgotPwd);
// router.post('/validate', controller.validateToken);
// router.post('/signout', controller.logOut);
router.post('/admin_signup',verifySignUp.checkDuplicateMobileOrEmail, controller.adminSignup);
router.post('/signin', controller.signIn);

module.exports = router;