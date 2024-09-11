const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' });

// Register User
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, token },
  });

  res.json({ user, token });
});

// Login User
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ user, token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Create Destination
app.post('/destinations', async (req, res) => {
  const { name, token } = req.body;
  const decoded = jwt.verify(token, 'your_jwt_secret');
  const user = await prisma.user.findUnique({ where: { email: decoded.email } });

  if (user) {
    const destination = await prisma.destination.create({
      data: { name, userId: user.id },
    });
    res.json(destination);
  } else {
    res.status(401).send('Unauthorized');
  }
});

// Add Review
app.post('/reviews', async (req, res) => {
  const { rating, comment, destinationId, token } = req.body;
  const decoded = jwt.verify(token, 'your_jwt_secret');
  const user = await prisma.user.findUnique({ where: { email: decoded.email } });

  if (user) {
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        destinationId,
        userId: user.id,
      },
    });
    res.json(review);
  } else {
    res.status(401).send('Unauthorized');
  }
});

// Upload Picture
app.post('/upload', upload.single('picture'), (req, res) => {
  res.send(`File uploaded: ${req.file.filename}`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
