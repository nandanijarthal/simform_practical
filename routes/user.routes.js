const express = require('express');
const controller = require("../controllers/user_controller");
const router = express.Router();
const verifySignUp = require("../middleware/verifySignUp");
const upload = require("../middleware/upload");
const auth = require("../middleware/authJwt");

router.post('/create_distributor',auth.verifyToken,auth.isAdmin,upload.uploadFiles,verifySignUp.checkDuplicateMobileOrEmail, controller.createDistributor);
router.post('/create_shop',auth.verifyToken,auth.isDistributor,upload.uploadFiles,verifySignUp.checkDuplicateMobileOrEmail, controller.createShop);
router.get('/get_shop_users',auth.verifyToken,auth.isDistributor, controller.getShopUsers);
router.get('/get_all_users',auth.verifyToken,auth.isAdmin, controller.getAllUsers);

module.exports = router;