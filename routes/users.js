const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userscontroller');
const authenticate = require('../middleware/auth');

// Auth routes
router.post('/register', usersController.register);
router.post('/login', usersController.login);

// Authenticated route
router.get('/profile', authenticate, usersController.getProfile);

// Admin-style CRUD (Optional: add role check middleware if needed)
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
