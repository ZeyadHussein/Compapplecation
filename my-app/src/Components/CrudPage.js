import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudPage = () => {
    const [payments, setPayments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [formData, setFormData] = useState({
        pay_id: '',
        order_id: '',
        pay_type: '',
        pay_date: '',
        pay_amount: '',
        cus_id: '',
        order_date: '',
        total_amount: '',
        payment_status: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState('payment');
    const [newOrder, setNewOrder] = useState({
        cus_id: '',
        order_date: '',
        total_amount: '',
        payment_status: ''
    });
    const [isAddOrderVisible, setIsAddOrderVisible] = useState(false); // Track visibility of add order form

    useEffect(() => {
        fetchPayments();
        fetchOrders();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/payments');
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNewOrderChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({
            ...newOrder,
            [name]: value
        });
    };

    const handleAddOrder = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/addorder', newOrder);
            alert('Order added successfully');
            setNewOrder({
                cus_id: '',
                order_date: '',
                total_amount: '',
                payment_status: ''
            });
            fetchOrders(); // Refresh the orders list
            setIsAddOrderVisible(false); // Hide the form after adding
        } catch (error) {
            console.error('Error adding order:', error);
            alert('Failed to add order');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (view === 'payment' && !formData.pay_id) {
            alert('Please select a payment to update');
            return;
        } else if (view === 'order' && !formData.order_id) {
            alert('Please select an order to update');
            return;
        }

        try {
            if (view === 'payment') {
                await axios.put('http://localhost:5000/api/update-payment', formData);
                alert('Payment updated successfully');
            } else if (view === 'order') {
                await axios.put('http://localhost:5000/api/update-order', formData);
                alert('Order updated successfully');
            }
            setFormData({
                pay_id: '',
                order_id: '',
                pay_type: '',
                pay_date: '',
                pay_amount: '',
                cus_id: '',
                order_date: '',
                total_amount: '',
                payment_status: ''
            });
            fetchPayments();
            fetchOrders();
        } catch (error) {
            console.error('Error updating:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            if (view === 'payment') {
                await axios.delete('http://localhost:5000/api/delete-payment', { data: { pay_id: id } });
            } else if (view === 'order') {
                await axios.delete('http://localhost:5000/api/delete-order', { data: { order_id: id } });
            }
            alert(`${view.charAt(0).toUpperCase() + view.slice(1)} deleted successfully`);
            fetchPayments();
            fetchOrders();
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    const handleSearch = async () => {
        try {
            if (view === 'payment') {
                const response = await axios.get('http://localhost:5000/api/searchpayment', {
                    params: { term: searchTerm }
                });
                setPayments(response.data);
            } else if (view === 'order') {
                const response = await axios.get('http://localhost:5000/api/searchorder', {
                    params: { term: searchTerm }
                });
                setOrders(response.data);
            }
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
            backgroundColor: '#E0F7FA',
            borderRadius: '8px',
        },
        header: {
            textAlign: 'center',
            color: '#0277BD',
        },
        button: {
            padding: '10px 20px',
            margin: '10px',
            cursor: 'pointer',
            backgroundColor: '#29B6F6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
        },
        buttonActive: {
            backgroundColor: '#0288D1',
        },
        form: {
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        input: {
            padding: '10px',
            margin: '10px',
            width: '200px',
            border: '1px solid #B3E5FC',
            borderRadius: '4px',
        },
        table: {
            width: '100%',
            marginTop: '20px',
            borderCollapse: 'collapse',
        },
        th: {
            backgroundColor: '#29B6F6',
            color: 'white',
            padding: '10px',
            textAlign: 'left',
        },
        td: {
            padding: '10px',
            border: '1px solid #B3E5FC',
        },
        noData: {
            textAlign: 'center',
            fontStyle: 'italic',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>{view.charAt(0).toUpperCase() + view.slice(1)} Management</h1>

            {/* Toggle between Payment and Order */}
            <div>
                <button
                    onClick={() => setView('payment')}
                    style={{ ...styles.button, ...(view === 'payment' ? styles.buttonActive : {}) }}
                >
                    Payment
                </button>
                <button
                    onClick={() => setView('order')}
                    style={{ ...styles.button, ...(view === 'order' ? styles.buttonActive : {}) }}
                >
                    Order
                </button>
            </div>

            {/* Toggle Add Order Form */}
            {view === 'order' && (
                <div>
                    <button
                        onClick={() => setIsAddOrderVisible(!isAddOrderVisible)} // Toggle visibility
                        style={styles.button}
                    >
                        {isAddOrderVisible ? 'Hide Add Order' : 'Show Add Order'}
                    </button>

                    {/* Add Order Form */}
                    {isAddOrderVisible && (
                        <form onSubmit={handleAddOrder} style={styles.form}>
                            <input
                                type="text"
                                name="cus_id"
                                placeholder="Customer ID"
                                value={newOrder.cus_id}
                                onChange={handleNewOrderChange}
                                required
                                style={styles.input}
                            />
                            <input
                                type="date"
                                name="order_date"
                                placeholder="Order Date"
                                value={newOrder.order_date}
                                onChange={handleNewOrderChange}
                                required
                                style={styles.input}
                            />
                            <input
                                type="number"
                                name="total_amount"
                                placeholder="Total Amount"
                                value={newOrder.total_amount}
                                onChange={handleNewOrderChange}
                                required
                                style={styles.input}
                            />
                            <input
                                type="text"
                                name="payment_status"
                                placeholder="Payment Status"
                                value={newOrder.payment_status}
                                onChange={handleNewOrderChange}
                                required
                                style={styles.input}
                            />
                            <button type="submit" style={styles.button}>Add Order</button>
                        </form>
                    )}
                </div>
            )}

            {/* Search Form */}
            <div>
                <input
                    type="text"
                    placeholder={`Search by ${view === 'payment' ? 'Order ID or Payment Date' : 'Order Date or Amount'}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleSearch} style={styles.button}>Search</button>
            </div>

            {/* Display List Based on View */}
            <table style={styles.table}>
                <thead>
                    <tr>
                        {view === 'payment' ? (
                            <>
                                <th style={styles.th}>Order ID</th>
                                <th style={styles.th}>Payment Type</th>
                                <th style={styles.th}>Payment Date</th>
                                <th style={styles.th}>Payment Amount</th>
                            </>
                        ) : (
                            <>
                                <th style={styles.th}>Customer ID</th>
                                <th style={styles.th}>Order Date</th>
                                <th style={styles.th}>Total Amount</th>
                                <th style={styles.th}>Payment Status</th>
                            </>
                        )}
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(view === 'payment' ? payments : orders).length === 0 ? (
                        <tr>
                            <td colSpan="5" style={styles.noData}>No {view}s available</td>
                        </tr>
                    ) : (
                        (view === 'payment' ? payments : orders).map((item) => (
                            <tr key={item[view === 'payment' ? 'pay_id' : 'order_id']}>
                                <td style={styles.td}>{item[view === 'payment' ? 'order_id' : 'cus_id']}</td>
                                <td style={styles.td}>{item[view === 'payment' ? 'pay_type' : 'order_date']}</td>
                                <td style={styles.td}>{item[view === 'payment' ? 'pay_date' : 'total_amount']}</td>
                                <td style={styles.td}>{item[view === 'payment' ? 'pay_amount' : 'payment_status']}</td>
                                <td style={styles.td}>
                                    <button onClick={() => setFormData(item)} style={styles.button}>Edit</button>
                                    <button onClick={() => handleDelete(item[view === 'payment' ? 'pay_id' : 'order_id'])} style={styles.button}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Form to Edit Payment or Order */}
            <form onSubmit={handleUpdate} style={styles.form}>
                <h2>Edit {view.charAt(0).toUpperCase() + view.slice(1)}</h2>
                {view === 'payment' ? (
                    <>
                        <input
                            type="text"
                            name="order_id"
                            placeholder="Order ID"
                            value={formData.order_id}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="pay_type"
                            placeholder="Payment Type"
                            value={formData.pay_type}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                        <input
                            type="date"
                            name="pay_date"
                            placeholder="Payment Date"
                            value={formData.pay_date}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                        <input
                            type="number"
                            name="pay_amount"
                            placeholder="Payment Amount"
                            value={formData.pay_amount}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            name="cus_id"
                            placeholder="Customer ID"
                            value={formData.cus_id}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                        <input
                            type="date"
                            name="order_date"
                            placeholder="Order Date"
                            value={formData.order_date}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                        <input
                            type="number"
                            name="total_amount"
                            placeholder="Total Amount"
                            value={formData.total_amount}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="payment_status"
                            placeholder="Payment Status"
                            value={formData.payment_status}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </>
                )}
                <button type="submit" style={styles.button}>Update {view.charAt(0).toUpperCase() + view.slice(1)}</button>
            </form>
        </div>
    );
};

export default CrudPage;
