const express = require('express');
const router = express.Router();
const userController = require('../controllers/userscontroller');
const { verifyToken } = require('../middleware/authMiddleware'); 

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', verifyToken, userController.getme); 

module.exports = router;
