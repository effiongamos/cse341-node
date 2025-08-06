require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger/swagger.json');
const connectDB = require('./config/db');
const passportConfig = require('./config/passport');
const mongoose = require('mongoose');

// Init app
const app = express();

// Connect to MongoDB
connectDB();

// Passport config
require('./config/passport')(passport);

// Middleware
app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/contacts', require('./routes/contacts'));

// Home
app.get('/', (req, res) => {
  res.send('Welcome to the Contact and User Management API. Visit /api-docs');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
