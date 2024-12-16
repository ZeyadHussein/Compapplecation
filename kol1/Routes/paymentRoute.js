const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// POST route to add payment information
router.post('/adpayment', (req, res) => {
    console.log("Post Request Received");

    // Query to insert payment details into the payment table
    const query = `
        INSERT INTO payment (order_id, pay_type, pay_date, pay_amount)
        VALUES (?, ?, ?, ?)
    `;

    // Execute the query with the data from the request body
    pool.query(query, [
        req.body.order_id,
        req.body.pay_type,
        req.body.pay_date,
        req.body.pay_amount
    ], (err, result) => {
        if (err) {
            console.error('Error while inserting record:', err);
            return res.status(500).json({ "Status": "Error", "Message": "Failed to add record" });
        }

        // Respond with success message and the ID of the inserted record
        console.log("Record Added", result.insertId);
        res.json({
            "Status": "OK",
            "Message": `Record Added Successfully with Id ${result.insertId}`
        });
    });
});


// Route to get all payments
router.get('/payments', (req, res) => {
    console.log('Request received for all payments');
    
    const sql = 'SELECT * FROM payment';
    
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching payments:', err);
            res.status(500).send('Error fetching payments');
            return;
        }
        
        res.json(results);
    });
});


router.put('/update-payment', (req, res) => {
    const { pay_id, order_id, pay_type, pay_date, pay_amount } = req.body;
    if (!pay_id || !order_id || !pay_type || !pay_date || !pay_amount) {
        res.status(400).send("All fields (pay_id, order_id, pay_type, pay_date, pay_amount) are required");
        return;
    }

    const query = `UPDATE payment SET order_id = ?, pay_type = ?, pay_date = ?, pay_amount = ? WHERE pay_id = ?`;

    pool.query(query, [order_id, pay_type, pay_date, pay_amount, pay_id], (err, result) => {
        if (err) {
            console.error("Error updating payment:", err);
            res.status(500).send("Error updating payment");
            return;
        }
        
        if (result.affectedRows === 0) {
            res.status(404).send("Payment not found");
            return;
        }

        res.send("Payment updated successfully");
    });
});


// Delete from payment table
router.post('/delete-payment', (req, res) => {
    const { pay_id } = req.body;  // Assuming the ID of the payment to be deleted is sent in the request body
    const query = `DELETE FROM payment WHERE pay_id = ${pay_id}`;
    
    pool.query(query, (err, result) => {
        if (err) {
            console.error("Error deleting payment:", err);
            res.status(500).send("Error deleting payment");
            return;
        }
        res.send('Payment deleted successfully');
    });
});

// Route to search payments by order ID or payment date
router.get('/searchpayment', (req, res) => {
    const { term } = req.query; // Search term from the query string
    
    // SQL query to search payments by order_id or pay_date
    const query = `
        SELECT * FROM payment 
        WHERE order_id = ? OR pay_date LIKE ?
    `;

    // Use pool.query to execute the query
    pool.query(query, [parseInt(term), `%${term}%`], (err, results) => {
        if (err) {
            console.error('Error during search:', err);
            res.status(500).send('Error during search');
            return;
        }
        res.json(results); // Send the results back as JSON
    });
});




module.exports = router;