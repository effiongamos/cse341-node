const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactsController');

router.get('/', controller.getAllContacts);
router.get('/:id', controller.getContactById);

module.exports = router;
