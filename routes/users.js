const express = require('express');
const { register, login, getProfile } = require('../controllers/userscontroller');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getProfile);

module.exports = router;
