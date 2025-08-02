const Contact = require('../models/contact');

// GET /contacts - Retrieve all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching contacts.' });
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
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        message: 'firstName, lastName, email, favoriteColor, and birthday are required.'
      });
    }

    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /contacts/:id - Full update (replace contact)
exports.updateContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        message: 'All fields (firstName, lastName, email, favoriteColor, birthday) are required for full update.'
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: 'Invalid request or ID.' });
  }
};

// PATCH /contacts/:id - Partial update
exports.patchContact = async (req, res) => {
  try {
    const updates = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(400).json({ message: 'Invalid request or ID.' });
  }
};

// DELETE /contacts/:id - Delete a contact
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
