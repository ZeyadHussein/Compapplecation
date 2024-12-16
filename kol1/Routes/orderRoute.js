const express = require('express');
const router = express.Router();
const pool = require('../db/db');


// Route to add a specific order
router.post('/addorder', (req, res) => {
    console.log("Received request to add order:", req.body);
    const { cus_id, order_date, total_amount, payment_status } = req.body;

    // Validate input fields
    if (!cus_id || !order_date || total_amount === undefined || !payment_status) {
        return res.status(400).json({ message: 'Please provide all fields: cus_id, order_date, total_amount, payment_status' });
    }

    // Insert the order into the database
    pool.query(
        'INSERT INTO orders (cus_id, order_date, total_amount, payment_status) VALUES (?, ?, ?, ?)', 
        [cus_id, order_date, total_amount, payment_status], 
        (err, result) => {
            if (err) {
                console.error("Error inserting order:", err.message);
                return res.status(500).json({ message: 'Error inserting order', error: err.message });
            }
            res.status(201).json({ message: `Order added successfully with ID: ${result.insertId}` });
        }
    );
});


// Route to get all orders
router.get('/orders', (req, res) => {
    console.log('Fetching all orders...');

    let sql = 'SELECT * FROM orders';
    
    pool.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching orders:", err);
            res.status(500).send("Error fetching orders");
            return;
        }
        res.json(results);
    });
});


// Route to update an existing order in the database
router.put('/update-order', (req, res) => {
    const { order_id, order_date, total_amount, payment_status } = req.body;

    if (!order_id || !order_date || !total_amount || !payment_status) {
        res.status(400).send("All fields (order_id, order_date, total_amount, payment_status) are required");
        return;
    }

    const query = `UPDATE orders SET order_date = ?, total_amount = ?, payment_status = ? WHERE order_id = ?`;

    pool.query(query, [order_date, total_amount, payment_status, order_id], (err, result) => {
        if (err) {
            console.error("Error updating order:", err);
            res.status(500).send("Error updating order");
            return;
        }
        
        if (result.affectedRows === 0) {
            res.status(404).send("Order not found");
            return;
        }

        res.send("Order updated successfully");
    });
});


// Route to delete an existing order from the database
router.delete('/delete-order', (req, res) => {
    const { order_id } = req.body;  // Assuming order_id is passed in the request body

    if (!order_id) {
        return res.status(400).send("Order ID (order_id) is required");
    }

    const query = `DELETE FROM orders WHERE order_id = ?`;

    pool.query(query, [order_id], (err, result) => {
        if (err) {
            console.error("Error deleting order:", err);
            return res.status(500).send("Error deleting order");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Order not found");
        }

        res.send("Order deleted successfully");
    });
});

router.get('/searchorder', (req, res) => {
    const { term } = req.query;

    // Log the incoming term to ensure it's being passed correctly
    console.log('Search term:', term);

    // Ensure term is a valid value
    if (!term) {
        return res.status(400).send('Search term is required');
    }

    const query = `
        SELECT * FROM orders 
        WHERE order_date LIKE ? OR total_amount = ?
    `;

    pool.query(query, [`%${term}%`, parseFloat(term)], (err, results) => {
        if (err) {
            console.error('Error during search query execution:', err);
            res.status(500).send('Error during search');
            return;
        }
        if (!results || results.length === 0) {
            console.log('No results found');
            res.status(404).send('No orders found');
            return;
        }
        res.json(results); // Send the results back as JSON
    });
});

module.exports = router;