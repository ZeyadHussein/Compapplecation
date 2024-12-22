const express = require('express');
const app = express();

// Import route files
const customerRoute = require('./Routes/customerRoute');
const tableRoute = require('./Routes/tableRoute');
const orderRoute = require('./Routes/orderRoute');
const menuitemRoute = require('./Routes/menuitemRoute');
const orderitemRoute = require('./Routes/orderitemsRoute');
const paymentRoute = require('./Routes/paymentRoute');
const reservationRoute = require('./Routes/reservationRoute');

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Define routes with specific path names
app.use('/api/customers', customerRoute);
app.use('/api/tables', tableRoute);
app.use('/api/orders', orderRoute);
app.use('/api/menuitems', menuitemRoute);
app.use('/api/orderitems', orderitemRoute);
app.use('/api/payments', paymentRoute);
app.use('/api/reservations', reservationRoute);

// Catch-all for undefined routes (404)
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
