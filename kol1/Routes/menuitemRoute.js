const express = require('express');
const router = express.Router();
const pool = require('../db/db');


router.post('/addmenuitem', (req, res) => {
    const { item_name, item_description, item_price } = req.body;

    if (!item_name || !item_description || typeof item_price !== 'number') {
        return res.status(400).json({
            message: 'Invalid input. Please provide item_name, item_description, and item_price.'
        });
    }

    const menuitem = { item_name, item_description, item_price };
    const sql = 'INSERT INTO menuitem SET ?';

    pool.query(sql, menuitem, (err, result) => {
        if (err) {
            console.error("Error adding menu item:", err);
            return res.status(500).json({ message: 'Error adding menu item' });
        }

        res.status(201).json({ message: 'Menu item added successfully', menuItemId: result.insertId });
    });
});



// Route to get all menu items
router.get('/menuitems', (req, res) => {
    console.log('Request received to fetch all menu items');
    
    pool.query('SELECT * FROM menuitem', (err, results) => {
        if (err) {
            console.error('Error fetching menu items:', err);
            res.status(500).send('Error fetching menu items');
            return;
        }
        res.json(results);
    });
});


// Route to update an existing menu item in the database
router.put('/update-menuitem', (req, res) => {
    const { menuitem_id, item_name, item_description, item_price } = req.body;

    if (!menuitem_id || !item_name || !item_description || !item_price) {
        res.status(400).send("All fields (menuitem_id, item_name, item_description, item_price) are required");
        return;
    }

    const query = `UPDATE menuitem SET item_name = ?, item_description = ?, item_price = ? WHERE menuitem_id = ?`;

    pool.query(query, [item_name, item_description, item_price, menuitem_id], (err, result) => {
        if (err) {
            console.error("Error updating menu item:", err);
            res.status(500).send("Error updating menu item");
            return;
        }
        
        if (result.affectedRows === 0) {
            res.status(404).send("Menu item not found");
            return;
        }

        res.send("Menu item updated successfully");
    });
});


router.delete('/delete-menuitem', (req, res) => {
    const { menuitem_id } = req.body;

    if (!menuitem_id) {
        res.status(400).send("menuitem_id is required");
        return;
    }

    const query = `DELETE FROM menuitem WHERE menuitem_id = ?`;

    pool.query(query, [menuitem_id], (err, result) => {
        if (err) {
            console.error("Error deleting menu item:", err);
            res.status(500).send("Error deleting menu item");
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send("Menu item not found");
            return;
        }

        res.send("Menu item deleted successfully");
    });
});
// Route to search menu items by name or description
router.get('/searchmenuitem', (req, res) => {
    const { term } = req.query;
    const query = `
        SELECT * FROM menuitem
        WHERE item_name LIKE ? OR item_description LIKE ?
    `;
    pool.query(query, [`%${term}%`, `%${term}%`], (err, results) => {
        if (err) {
            console.error('Error during search:', err);
            res.status(500).send('Error during search');
            return;
        }
        res.json(results);  // Send the results back as JSON
    });
});


module.exports = router;