const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI); // from .env
let dbConnection;

module.exports = {
  connectToServer: async function (callback) {
    try {
      await client.connect();
      dbConnection = client.db(); // optionally add db name: client.db("your_db_name")
      console.log("Connected to MongoDB!");
      callback();
    } catch (err) {
      console.error("MongoDB connection error:", err);
      callback(err);
    }
  },

  getDb: function () {
    return dbConnection;
  }
};
