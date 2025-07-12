const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { connectToDatabase } = require('./db/conn');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const contactsRoutes = require('./routes/contacts');
app.use('/contacts', contactsRoutes);

// Start server
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
