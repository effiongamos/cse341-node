const mongoose = require('mongoose');
const Contact = require('../models/contact');

// GET /contacts - Get all contacts for the authenticated user
exports.getContacts = async (req, res) => {
  try {
    console.log('Authenticated user:', req.user); // Optional for debugging
    const contacts = await Contact.find({ userId: req.user.id });
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Server error while fetching contacts', error: error.message });
  }
};

// GET /contacts/:id - Get a single contact by ID (only if belongs to user)
exports.getContactById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid contact ID format' });
  }

  try {
    const contact = await Contact.findOne({ _id: id, userId: req.user.id });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact by ID:', error);
    res.status(500).json({ message: 'Error fetching contact', error: error.message });
  }
};

// POST /contacts - Add a new contact
exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const contact = new Contact({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
      userId: req.user.id,
    });

    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Error adding contact', error: error.message });
  }
};

// PUT /contacts/:id - Update an existing contact
exports.updateContactById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid contact ID format' });
  }

  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const contact = await Contact.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { firstName, lastName, email, favoriteColor, birthday },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found or not authorized' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ message: 'Error updating contact', error: error.message });
  }
};

// DELETE /contacts/:id - Delete a contact
exports.deleteContactById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid contact ID format' });
  }

  try {
    const contact = await Contact.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found or not authorized' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
};
