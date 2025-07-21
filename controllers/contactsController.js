const Contact = require('../models/contact');

exports.getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

exports.getContactById = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ message: 'Not found' });
  res.status(200).json(contact);
};

exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!contact) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
