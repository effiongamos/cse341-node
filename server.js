const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db/conn');

const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectToDatabase().then(() => {
  app.use('/contacts', require('./routes/contacts'));

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
