const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let db;

const client = new MongoClient(process.env.MONGODB_URI);

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('contactsDB');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
}

function getDb() {
  return db;
}

module.exports = { connectToDatabase, getDb };
