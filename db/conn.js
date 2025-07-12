const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db(); // uses the DB in URI
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ DB connection error:', err);
  }
}

function getDb() {
  return db;
}

module.exports = { connectToDatabase, getDb };
