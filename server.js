const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

dotenv.config();

const contactsRoutes = require("./routes/contacts");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB with Mongoose!");

    // API routes
    app.use("/contacts", contactsRoutes);

    // Home route
    app.get("/", (req, res) => {
      res.send("Welcome to the Contacts API. Use /contacts and /api-docs");
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });


