const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'movie_tracker',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Route to retrieve user information
app.get('/profile/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT id, username, email FROM users WHERE id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Route to update user password
app.put('/profile/update-password/:userId', (req, res) => {
    const userId = req.params.userId;
    const { newPassword } = req.body;

    const sql = 'UPDATE users SET password = ? WHERE id = ?';
    db.query(sql, [newPassword, userId], (err, result) => {
        if (err) {
            res.send({ message: 'Error updating password' });
            throw err;
        }
        res.send({ message: 'Password updated successfully' });
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
