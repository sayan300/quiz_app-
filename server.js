const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config();
const pool = require('./db');

const app = express();
app.use(express.json());

// Serve static files, but do NOT auto-serve index.html for "/"
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// Root route → always show the sign-up page first (login.html = account creation form)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Register (used by login.html — the "Create Your Account" form)
app.post('/api/register', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3)',
            [fullName, email, passwordHash]
        );

        res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login (used by registration.html — the "sign in" form)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
