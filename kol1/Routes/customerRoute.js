const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret'; // Secure this in production

// JWT Authentication Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied: No Token Provided');

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid or expired token');
        req.user = user; // Attach user data to request
        next(); // Proceed to the next middleware or route handler
    });
}

// Route to add a customer (token will be generated here)
router.post('/addcustomer', (req, res) => {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
        return res.status(400).json({ message: 'Please provide all fields: name, phone, email' });
    }

    pool.query(
        'INSERT INTO customer (name, phone, email) VALUES (?, ?, ?)',
        [name, phone, email],
        (err, result) => {
            if (err) {
                console.error('Error inserting customer:', err);
                return res.status(500).json({ message: 'Error inserting customer', error: err.message });
            }

            // Generate a JWT token
            const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({
                message: `Customer ${name} added successfully with ID: ${result.insertId}`,
                token, // Send token back to the client
            });
        }
    );
});

// Other routes (fixed syntax issues)
router.get('/customers', authenticateToken, (req, res) => {
    const sql = 'SELECT * FROM customer';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching customers:', err);
            res.status(500).send('Error fetching customers');
            return;
        }
        res.json(results);
    });
});

router.put('/update-customer', authenticateToken, (req, res) => {
    const { cus_id, name, phone, email } = req.body;

    if (!cus_id || !name || !phone || !email) {
        return res.status(400).send('All fields (cus_id, name, phone, email) are required');
    }

    const query = 'UPDATE customer SET name = ?, phone = ?, email = ? WHERE cus_id = ?';

    pool.query(query, [name, phone, email, cus_id], (err, result) => {
        if (err) {
            console.error('Error updating customer:', err);
            return res.status(500).json({ message: 'Error updating customer' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.json({ message: 'Customer updated successfully' });
    });
});

router.delete('/delete-customer', authenticateToken, (req, res) => {
    const { cus_id } = req.body;

    if (!cus_id) {
        return res.status(400).send('Customer ID (cus_id) is required');
    }

    const query = 'DELETE FROM customer WHERE cus_id = ?';

    pool.query(query, [cus_id], (err, result) => {
        if (err) {
            console.error('Error deleting customer:', err);
            return res.status(500).send('Error deleting customer');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Customer not found');
        }

        res.send('Customer deleted successfully');
    });
});

router.get('/searchcustomer', authenticateToken, (req, res) => {
    const { term } = req.query;

    const query = `
        SELECT * FROM customer
        WHERE name LIKE ? OR email LIKE ?
    `;

    pool.query(query, [`%${term}%`, `%${term}%`], (err, results) => {
        if (err) {
            console.error('Error during search:', err);
            res.status(500).send('Error during search');
            return;
        }
        res.json(results);
    });
});

router.post('/login', (req, res) => {
    const { email, phone } = req.body;

    if (!email || !phone) {
        return res.status(400).json({ message: 'Email and phone are required' });
    }

    const query = 'SELECT * FROM customer WHERE email = ? AND phone = ?';

    pool.query(query, [email, phone], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
            const token = jwt.sign({ id: results[0].cus_id, email: results[0].email }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: 'Login successful', token });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

module.exports = router;
