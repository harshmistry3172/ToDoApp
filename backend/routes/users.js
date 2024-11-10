const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Request Body:", req.body);

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create and save the new user
    const user = new User({ email, password });
    console.log("New User:", user);
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Error during save:", error);
    res.status(500).json({ message: error.message });
  }
});


// Login route
// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // Assuming you are using email, not username
    const user = await User.findOne({ email }); // Find user by email
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Sign the token with the user's unique _id (not username)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// API route to get user data using the token
router.get('/user', async (req, res) => {
  try {
    // Get token from Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    // Verify and decode the token to get userId
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret
    const userId = decodedToken.userId;

    // Find user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with user's email
    res.json({ email: user.email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



module.exports = router;
