const express = require('express');
const app = express();
const customerRoute = require('./Routes/customerRoute');
const tableRoute = require('./Routes/tableRoute');
const orderRoute = require('./Routes/orderRoute');
const menuitemRoute = require('./Routes/menuitemRoute');
const orderitemRoute = require('./Routes/orderitemsRoute');
const paymentRoute = require('./Routes/paymentRoute');
const reservationRoute = require('./Routes/reservationRoute');

app.use(express.json()); // Middleware to parse JSON body

app.use('/api', customerRoute);
app.use('/api', tableRoute);
app.use('/api', orderRoute);
app.use('/api', menuitemRoute);
app.use('/api', orderitemRoute);
app.use('/api', paymentRoute);
app.use('/api', reservationRoute);


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});