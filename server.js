// server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'Sanjosetere9803*';

app.use(cors({
  origin: 'http://localhost:5173', // Adjust this URL if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Middleware to check token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, userId: user.id });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/destinations', async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching destinations' });
  } finally {
    await prisma.$disconnect();
  }
});

// Login endpoint
// Backend (Express) - Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      console.error(`User not found: ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.error(`Password mismatch for user: ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user.id });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Ensure you have the correct route for adding comments
app.get('/api/destinations/:destinationId/comments', async (req, res) => {
  const { destinationId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { destinationId: parseInt(destinationId) }, // Ensure the ID is an integer
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/destinations/:destinationId/comments', authenticateToken, async (req, res) => {
  console.log(`Received comment for destinationId: ${req.params.destinationId}`);
  
  const { destinationId } = req.params;
  const { comment, name } = req.body;

  try {
    const newComment = await prisma.comment.create({
      data: {
        destinationId: parseInt(destinationId), // Ensure destinationId is an integer
        comment,
        name,
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Create review endpoint
app.post('/api/destinations/:destinationId/reviews', authenticateToken, async (req, res) => {
  const { destinationId } = req.params;
  const { review, picture } = req.body; // Assuming picture is being sent as a string (URL)

  try {
    const newReview = await prisma.review.create({
      data: {
        destinationId: parseInt(destinationId), // Ensure destinationId is an integer
        review,
        picture, // Adjust based on how you're handling images
        userId: req.user.userId, // Assuming userId is stored in the token
      },
    });
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Logout endpoint
app.post('/api/logout', (req, res) => {
  res.status(200).send('Logged out');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


