const express = require('express');
const router = express.Router();
const userController = require('../controllers/userscontroller');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', verifyToken, userController.getme);

// Add this route to list users (optional – maybe protected)
router.get('/', verifyToken, userController.getAllUsers);

module.exports = router;
