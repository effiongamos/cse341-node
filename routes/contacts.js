const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const contactsController = require('../controllers/contactsController');

// Protect all /contacts routes
router.use(verifyToken);

// GET all contacts for authenticated user
router.get('/', contactsController.getContacts);

// GET a single contact by ID
router.get('/:id', contactsController.getContactById);

// POST a new contact
router.post('/', contactsController.createContact);

// PUT update a contact by ID
router.put('/:id', contactsController.updateContactById);

// DELETE a contact by ID
router.delete('/:id', contactsController.deleteContactById);

module.exports = router;
