const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../db/conn');

// GET all contacts
router.get('/', async (req, res) => {
  const db = getDb();
  const contacts = await db.collection('contacts').find().toArray();
  res.json(contacts);
});

// GET contact by ID
router.get('/:id', async (req, res) => {
  const db = getDb();
  try {
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) return res.status(404).send('Contact not found');
    res.json(contact);
  } catch (error) {
    res.status(500).send('Invalid ID format');
  }
});

module.exports = router;
