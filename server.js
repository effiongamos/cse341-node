const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const db = require("./db/conn"); // DB connection logic
const contactsRoutes = require("./routes/contacts");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB then start server
db.connectToServer((err) => {
  if (err) {
    console.error("Failed to connect to database:", err);
    process.exit();
  }

  // Routes
  app.use("/contacts", contactsRoutes);

  //  Root route
  app.get("/", (req, res) => {
    res.send("Hello World!  Welcome to the Contacts API. Use /contacts to access the API.");
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
