const express = require('express');
const { ObjectId } = require('mongodb');
const { getDb } = require('../db/conn');

const router = express.Router();

// GET all contacts
router.get('/', async (req, res) => {
  const db = getDb();
  const contacts = await db.collection('contacts').find().toArray();
  res.json(contacts);
});

// GET contact by ID
router.get('/:id', async (req, res) => {
  const db = getDb();
  const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
  if (!contact) {
    res.status(404).send('Contact not found');
  } else {
    res.json(contact);
  }
});

module.exports = router;
