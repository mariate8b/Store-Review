const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../../db')

const authRouter = express.Router();

// Define the /api/auth/register route
authRouter.post('/register', async (req, res) => {
  try {
    // Destructure username and password from req.body
    const { username, password } = req.body;

    // Hash password with bcrypt
    const saltRounds = parseInt(process.env.SALT, 10) || 7;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user in the database (add your database logic here)
    // Example:
    // await User.create({ username, password: hashedPassword });

    // Send a success response
    res.status(201).send({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error); // Log error to the console
    res.status(500).send({ error: 'Could not register user' }); // Send error response
  }
});

module.exports = authRouter;