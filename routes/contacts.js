const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const contactsController = require('../controllers/contactsController');

// All routes are protected
router.use(verifyToken);

// GET all contacts for authenticated user
router.get('/', contactsController.getContacts);

// GET a single contact by ID
router.get('/:id', contactsController.getContactById);

// POST a new contact
router.post('/', contactsController.createContact);

// PUT update a contact
router.put('/:id', contactsController.updateContact);

// DELETE a contact
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
