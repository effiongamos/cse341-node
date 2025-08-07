const express = require('express');
const router = express.Router();
const userscontroller = require('../controllers/userscontroller');

// Register route
router.post('/register', userscontroller.register);

// Login route
router.post('/login', userscontroller.login);

// Protected route (example)
const { verifyToken } = require('../middleware/authMiddleware');
router.get('/me', verifyToken, userscontroller.getme);
router.get('/:id', verifyToken, userscontroller.getUserById);
router.put('/:id', verifyToken, userscontroller.updateUserById);
router.delete('/:id', verifyToken, userscontroller.deleteUserById);

// Add this route to list users (optional – maybe protected)
router.get('/', verifyToken, userscontroller.getAllUsers);

module.exports = router;
