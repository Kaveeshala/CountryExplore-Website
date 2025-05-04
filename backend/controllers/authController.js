// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    console.log('Register request body:', req.body); // Log incoming data
    
    const { name, email, password } = req.body;
    try {
        // Validate input
        if (!name || !email || !password) {
            console.log('Missing fields');
            return res.status(400).json({ message: "Please provide all fields" });
        }

        console.log('Checking for existing user...');
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: "User already exists" });
        }

        console.log('Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('Creating new user...');
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        console.log('User created successfully:', email);
        
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.login = async (req, res) => {
    console.log('Login request body:', req.body);
    
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        console.log('Finding user:', email);
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log('Comparing passwords...');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch for:', email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log('Generating token...');
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        console.log('Login successful for:', email);
        res.json({ 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email 
            } 
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};