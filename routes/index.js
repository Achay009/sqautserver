const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/v1/AuthController');
const UserController = require('../Controllers/v1/UserController');
const verifyToken = require('../Middleware/verifyToken')

/* GET home page. */
router.get('/',verifyToken, function(req, res, next) {
    res.json({
      data : {},
      status : 200,
      message : 'Inside index Controller'
    });
});
router.post('/login',AuthController.Login);
router.post('/register',AuthController.Register);
router.get('/user',verifyToken,UserController.index);

module.exports = router;
