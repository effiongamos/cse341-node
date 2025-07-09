const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { connectToDatabase } = require('./db/conn');

app.use(express.json());

// Routes
const contactsRoutes = require('./routes/contacts');
app.use('/contacts', contactsRoutes);

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
