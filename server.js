const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, userId: user.id });
  } catch (error) {
    console.error('Error registering user:', error); // Add this line for better error visibility
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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
// Create destination endpoint
app.post('/api/destination', authenticateToken, async (req, res) => {
  const { destination, review, picture } = req.body;
  try {
    const newDestination = await prisma.destination.create({
      data: {
        destination,
        review,
        picture,
        userId: req.user.userId,
      },
    });
    
    res.status(201).json(newDestination);
  } catch (error) {
    console.error('Error creating destination:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Fetch all destinations with comments
app.get('/api/destinations', async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany();
    res.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(3000, () => {
  console.log('Server running on port 3000');
});


// Create review endpoint
app.post('/api/reviews', authenticateToken, async (req, res) => {
  const { destination, review, picture } = req.body;
  try {
    const reviewData = await prisma.review.create({
      data: {
        destination,
        review,
        picture,
        userId: req.user.userId,
      },
    });
    res.status(201).json(reviewData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all reviews endpoint
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: { 
        user: true,
        destination: true // Ensure destination is included
      },
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Create comment endpoint
app.post('/api/comments', authenticateToken, async (req, res) => {
  const { destinationId, comment } = req.body;
  try {
    const newComment = await prisma.comment.create({
      data: {
        comment,
        destinationId,
        userId: req.user.userId,
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Logout endpoint
app.post('/api/logout', (req, res) => {
  res.status(200).send('Logged out');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

