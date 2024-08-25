const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser } = require('../../db/users');

const authRouter = express.Router();

authRouter.post('/register', checkUserData, checkUser, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ message: "Please provide username and password" });
    }

    // Check if user already exists
    const oldUser = await findUserByUsername(username);

    if (oldUser) {
      return res.status(400).send({ message: "The username is already taken" });
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT) || 10);

    // Create user in db
    const user = await createUser({ username, password: hashedPassword });

    // Create a token for user ---> include id
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "super_secret_key");

    // Send response with the token
    res.status(201).send({ token });

  } catch (error) {
    console.error(error); // Log error to the console
    res.status(500).send({ error: 'Could not register user' }); // Send error response
  }
});

module.exports = authRouter;