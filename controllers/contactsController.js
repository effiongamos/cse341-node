const Contact = require('../models/contact');

// GET /contacts - Retrieve all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching contacts." });
  }
};

// GET /contacts/:id - Retrieve a contact by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(400).json({ message: 'Invalid contact ID.' });
  }
};

// POST /contacts - Create a new contact
exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    // Check required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'firstName, lastName, email, favoritecolor and birthday are required to update.' });
    }

    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /contacts/:id - Update a contact by ID
exports.updateContact = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Validate input
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'firstName, lastName, email, favoritecolor and birthday are required to update.' });
    }

    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(400).json({ message: 'Invalid request or ID.' });
  }
};

// DELETE /contacts/:id - Delete a contact by ID
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ message: 'Server error deleting contact.' });
  }
};
