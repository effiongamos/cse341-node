const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db(); // uses the DB name from the URI
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
}

function getDb() {
  if (!db) {
    throw new Error('No database connection');
  }
  return db;
}

module.exports = { connectToDatabase, getDb };