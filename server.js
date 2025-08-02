const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Routes
const contactsRoutes = require("./routes/contacts");
const usersRoutes = require("./routes/users");

app.use("/contacts", contactsRoutes);
app.use("/users", usersRoutes);


// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Contacts and Users API. Use /contacts, /users  and /api-docs");
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB with Mongoose!");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
