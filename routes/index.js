const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/v1/AuthController');
const UserController = require('../Controllers/v1/UserController');
const PostController = require('../Controllers/v1/PostController');
const BidController = require('../Controllers/v1/BidController');
const verifyToken = require('../Middleware/verifyToken')

/* GET home page. */
/********Auth Controllers******** */
router.post('/login',AuthController.Login);
router.post('/register',AuthController.Register);

/************User Controllers****************** */
router.get('/',UserController.index);
router.get('/user',verifyToken,UserController.index);//This is suppose to get the user profile and shit
//router.get('/user/transactions',verifyToken,UserController.getuserTransactions);
// router.get('user/listing/all/?type=status',verifyToken,UserController.getStatusUserListings);
//router.get('user/listing/all',verifyToken,UserController.getAllUserListings);
// router.post('/user/profile',verifyToken,UserController.changeProfile);
 
// router.get('/user/listing/order',verifyToken,UserController.getUserOrder);

/************Other Controllers****************** */
router.post('/listing',verifyToken,PostController.postListing);
router.get('/listing/:id/type',verifyToken,PostController.getAListing);
router.get('/listing/type',PostController.index);


/********Bidding Controller************/
router.post('/user/listing/:id/orderBid',verifyToken,BidController.orderListing);//This one still needs changes

/************Admin Routes************ */
//This one is coming soon


module.exports = router;
