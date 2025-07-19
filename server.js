const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const contactsRoutes = require("./routes/contacts");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB with Mongoose!");

  // Routes
  app.use("/contacts", contactsRoutes);

  app.get("/", (req, res) => {
    res.send("Welcome to the Contacts API. Use /contacts to access the API data.");
  });

  // Start server after DB connects
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});


