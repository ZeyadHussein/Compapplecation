const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// Route to add a specific table
router.post('/addtable', (req, res) => {
    console.log("Request body:", req.body); // Add this line for debugging
    const { table_no, seating_cap } = req.body;

    if (!table_no || !seating_cap) {
        return res.status(400).json({ message: 'Please provide all fields: table_no, seating_cap' });
    }

    pool.query('INSERT INTO tables (table_no, seating_cap) VALUES (?, ?)', [table_no, seating_cap], (err, result) => {
        if (err) {
            console.error("Error inserting table:", err.message);
            return res.status(500).json({ message: 'Error inserting table', error: err.message });
        }
        res.status(201).json({ message: `Table ${table_no} added successfully with ID: ${result.insertId}` });
    });
});

// Route to get all tables
router.get('/tables', (req, res) => {
    console.log('Request received for all tables');
    
    const sql = 'SELECT * FROM tables';
    
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching tables:', err);
            res.status(500).send('Error fetching tables');
            return;
        }
        
        res.json(results);
    });
});


// Route to update an existing table in the database
router.put('/update-table', (req, res) => {
    const { table_id, table_no, seating_cap } = req.body;

    if (!table_id || !table_no || !seating_cap) {
        res.status(400).send("All fields (table_id, table_no, seating_cap) are required");
        return;
    }

    const query = `UPDATE tables SET table_no = ?, seating_cap = ? WHERE table_id = ?`;

    pool.query(query, [table_no, seating_cap, table_id], (err, result) => {
        if (err) {
            console.error("Error updating table:", err);
            res.status(500).send("Error updating table");
            return;
        }
        
        if (result.affectedRows === 0) {
            res.status(404).send("Table not found");
            return;
        }

        res.send("Table updated successfully");
    });
});

// Route to delete an existing table from the database
router.delete('/delete-table', (req, res) => {
    const { table_id } = req.body;  // Assuming table_id is passed in the request body

    if (!table_id) {
        return res.status(400).send("Table ID (table_id) is required");
    }

    const query = `DELETE FROM tables WHERE table_id = ?`;

    pool.query(query, [table_id], (err, result) => {
        if (err) {
            console.error("Error deleting table:", err);
            return res.status(500).send("Error deleting table");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Table not found");
        }

        res.send("Table deleted successfully");
    });
});

// Route to search tables by table number or seating capacity
router.get('/searchtables', (req, res) => {
    const { term } = req.query; // Search term from query parameters
    const query = `
        SELECT * FROM tables 
        WHERE table_no LIKE ? OR seating_cap LIKE ?
    `;

    pool.query(query, [`%${term}%`, `%${term}%`], (err, results) => {
        if (err) {
            console.error('Error during search:', err);
            res.status(500).send('Error during search');
            return;
        }
        res.json(results); // Send the results back as JSON
    });
});

module.exports = router;