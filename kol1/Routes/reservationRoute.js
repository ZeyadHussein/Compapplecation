const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// Route to add a reservation (POST route)
router.post('/addreservation', (req, res) => {
    const { cus_id, table_id, reservation_date, reservation_time, guest_no } = req.body;

    // Validate that all fields are provided
    if (!cus_id || !table_id || !reservation_date || !reservation_time || !guest_no) {
        return res.status(400).json({ message: 'Please provide all fields: cus_id, table_id, reservation_date, reservation_time, guest_no' });
    }

    let reservation = {
        cus_id,
        table_id,
        reservation_date,
        reservation_time,
        guest_no
    };

    // SQL query to insert the reservation
    let sql = 'INSERT INTO reservation SET ?';
    pool.query(sql, reservation, (err, result) => {
        if (err) {
            console.error("Error adding reservation:", err);
            return res.status(500).send("Error adding reservation");
        }
        res.status(201).send(`Reservation added with ID: ${result.insertId}`);
    });
});

// Route to get all reservations
router.get('/reservations', (req, res) => {
    console.log('Request received for all reservations');
    
    const sql = 'SELECT * FROM reservation';
    
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching reservations:', err);
            res.status(500).send('Error fetching reservations');
            return;
        }
        
        res.json(results);
    });
});

router.put('/update-reservation', (req, res) => {
    const { res_id, cus_id, table_id, reservation_date, reservation_time, guest_no } = req.body;

    // Check if all required fields are provided
    if (!res_id || !cus_id || !table_id || !reservation_date || !reservation_time || !guest_no) {
        return res.status(400).send("All fields (res_id, cus_id, table_id, reservation_date, reservation_time, guest_no) are required");
    }

    const query = `
        UPDATE reservation 
        SET cus_id = ?, table_id = ?, reservation_date = ?, reservation_time = ?, guest_no = ? 
        WHERE res_id = ?;
    `;

    pool.query(query, [cus_id, table_id, reservation_date, reservation_time, guest_no, res_id], (err, result) => {
        if (err) {
            console.error("Error updating reservation:", err);
            return res.status(500).send("Error updating reservation");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Reservation not found");
        }

        return res.send("Reservation updated successfully");
    });
});
router.delete('/delete-reservation', (req, res) => {
    const { res_id } = req.body;

    // Check if reservation ID is provided
    if (!res_id) {
        res.status(400).send("res_id is required");
        return;
    }

    const query = `DELETE FROM reservation WHERE res_id = ?`;

    pool.query(query, [res_id], (err, result) => {
        if (err) {
            console.error("Error deleting reservation:", err);
            res.status(500).send("Error deleting reservation");
            return;
        }

        // Check if any rows were affected (i.e., reservation was found and deleted)
        if (result.affectedRows === 0) {
            res.status(404).send("Reservation not found");
            return;
        }

        res.send("Reservation deleted successfully");
    });
});

/// Route to search reservations by date or guest number
router.get('/searchreservation', (req, res) => {
    const { term } = req.query;
    const query = `
        SELECT * FROM reservation 
        WHERE reservation_date LIKE ? OR guest_no = ?
    `;

    // Use pool.query to execute the query
    pool.query(query, [`%${term}%`, parseInt(term)], (err, results) => {
        if (err) {
            console.error('Error during search:', err);
            res.status(500).send('Error during search');
            return;
        }
        res.json(results); // Send the results back as JSON
    });
});


module.exports = router;