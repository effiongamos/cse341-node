const Contact = require('../models/contact');

// GET /contacts - Get all contacts for the authenticated user
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.id });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching contacts' });
  }
};

// POST /contacts - Add a new contact
exports.addContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const contact = new contact({
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
    res.status(500).json({ message: 'Error adding contact', error });
  }
};
