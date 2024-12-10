const mysql = require('mysql');

// Create a MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',     // Replace with your database host (e.g., 127.0.0.1)
    user: 'root',          // Replace with your MySQL username
    password: 'password',  // Replace with your MySQL password
    database: 'course_app' // Replace with the name of your database
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Export the connection for use in other files
module.exports = db;
