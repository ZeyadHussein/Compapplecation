const express = require('express');
const router = express.Router();
const pool = require('../db/db');


// Route to add an order item (POST route)
router.post('/addorderitem', (req, res) => {
    console.log("Request body:", req.body); // Log the incoming request body
    const { order_id, menuitem_id, quantity } = req.body;
  
    if (!order_id || !menuitem_id || !quantity) {
      console.error("Missing fields in request body");
      return res.status(400).json({ message: 'Please provide all fields: order_id, menuitem_id, quantity' });
    }
  
    let orderItem = { order_id, menuitem_id, quantity };
    let sql = 'INSERT INTO orderitem SET ?';
    pool.query(sql, orderItem, (err, result) => {
      if (err) {
        console.error("Error adding order item:", err);
        return res.status(500).send("Error adding order item");
      }
      res.status(201).send(`Order item added with ID: ${result.insertId}`);
    });
  });
  
// Route to get all order items
router.get('/orderitems', (req, res) => {
    console.log('Request received for all order items');
    
    const sql = 'SELECT * FROM orderitem';
    
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching order items:', err);
            res.status(500).send('Error fetching order items');
            return;
        }
        
        res.json(results);
    });
});

router.put('/update-orderitem', (req, res) => {
    const { orderitem_id, order_id, menuitem_id, quantity } = req.body;

    if (!orderitem_id || !order_id || !menuitem_id || !quantity) {
        res.status(400).send("All fields (orderitem_id, order_id, menuitem_id, quantity) are required");
        return;
    }

    const query = `UPDATE orderitem SET order_id = ?, menuitem_id = ?, quantity = ? WHERE orderitem_id = ?`;

    pool.query(query, [order_id, menuitem_id, quantity, orderitem_id], (err, result) => {
        if (err) {
            console.error("Error updating order item:", err);
            res.status(500).send("Error updating order item");
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send("Order item not found");
            return;
        }

        res.send("Order item updated successfully");
    });
});


router.delete('/delete-orderitem', (req, res) => {
    console.log('DELETE /delete-orderitem route hit');  // Log to confirm the route is accessed
    const { orderitem_id } = req.body;
    const query = `DELETE FROM orderitem WHERE orderitem_id = ${orderitem_id}`;

    pool.query(query, (err, result) => {
        if (err) {
            console.error("Error deleting orderitem:", err);
            res.status(500).send("Error deleting orderitem");
            return;
        }
        res.send('Order item deleted successfully');
    });
});
// Route to search order items by order ID or menu item ID
router.get('/searchorderitem', (req, res) => {
    const { term } = req.query;
    const query = `
        SELECT * FROM orderitem
        WHERE order_id = ? OR menuitem_id = ?
    `;

    pool.query(query, [parseInt(term), parseInt(term)], (err, results) => {
        if (err) {
            console.error('Error during search:', err);
            res.status(500).send('Error during search');
            return;
        }
        res.json(results); // Send the results back as JSON
    });
});

module.exports = router