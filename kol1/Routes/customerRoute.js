const express = require('express');
const router = express.Router();
const pool = require('../db/db');


// Route to add a customer
router.post('/addcustomer', (req, res) => {
    console.log("Received request to add customer:", req.body);
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
        return res.status(400).json({ message: 'Please provide all fields: name, phone, email' });
    }

    pool.query('INSERT INTO customer (name, phone, email) VALUES (?, ?, ?)', [name, phone, email], (err, result) => {
        if (err) {
            console.error("Error inserting customer:", err);
            return res.status(500).json({ message: 'Error inserting customer', error: err.message });
        }
        res.status(201).json({ message: `Customer ${name} added successfully with ID: ${result.insertId}` });
    });
});

// Route to get all customers
router.get('/customers', (req, res) => {
    console.log('Fetching all customers...');
    
    let sql = 'SELECT * FROM customer';
    
    pool.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching customers:", err);
            res.status(500).send("Error fetching customers");
            return;
        }
        res.json(results);
    });
});

// Route to update an existing customer in the database
router.put('/update-customer', (req, res) => {
    const { cus_id, name, phone, email } = req.body;

    if (!cus_id || !name || !phone || !email) {
        res.status(400).send("All fields (cus_id, name, phone, email) are required");
        return;
    }

    const query = `UPDATE customer SET name = ?, phone = ?, email = ? WHERE cus_id = ?`;

    pool.query(query, [name, phone, email, cus_id], (err, result) => {
        if (err) {
            console.error("Error updating customer:", err);
            res.status(500).send("Error updating customer");
            return;
        }
        
        if (result.affectedRows === 0) {
            res.status(404).send("Customer not found");
            return;
        }

        res.send("Customer updated successfully");
    });
});

// Route to delete an existing customer from the database
router.delete('/delete-customer', (req, res) => {
    const { cus_id } = req.body;  // Assuming cus_id is passed in the request body

    if (!cus_id) {
        return res.status(400).send("Customer ID (cus_id) is required");
    }

    const query = `DELETE FROM customer WHERE cus_id = ?`;

    pool.query(query, [cus_id], (err, result) => {
        if (err) {
            console.error("Error deleting customer:", err);
            return res.status(500).send("Error deleting customer");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Customer not found");
        }

        res.send("Customer deleted successfully");
    });
});

// Route to search customers by name or email
router.get('/searchcustomer', (req, res) => {
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
// Route for customer login
router.post('/login', (req, res) => {
    // Destructure email and phone from request body
    const { email, phone } = req.body;
    
    // Ensure both email and phone are provided
    if (!email || !phone) {
        return res.status(400).send('Email and phone are required');
    }

    // Query to check if the customer exists with the provided email and phone
    const query = 'SELECT * FROM customer WHERE email = ? AND phone = ?';
    
    // Query the database to find a matching customer
    pool.query(query, [email, phone], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).send('Server error');
        }
        
        // If customer found, login is successful
        if (results.length > 0) {
            res.send('Login successful');
        } else {
            // Invalid credentials
            res.status(401).send('Invalid credentials');
        }
    });
});



module.exports = router;