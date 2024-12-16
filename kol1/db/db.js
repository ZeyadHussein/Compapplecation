const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 10, // Limit the number of connections
    host: "localhost",
    user: "root",
    password: "", // Add your MySQL password here if needed
    database: "nodemysql"
});

// Connect to MySQL (Test the pool connection)
pool.getConnection((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL connected");
});

module.exports = pool;