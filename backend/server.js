const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "magic"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM teacher";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: "Error fetching data" });
        }
        return res.json(data);
    });
});

app.get('/teacher/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Fetching teacher with ID: ${id}`); // Log received ID
    const sql = "SELECT * FROM teacher WHERE ID = ?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: "Error fetching data" });
        }
        if (data.length === 0) {
            console.log('Teacher not found'); // Log when teacher is not found
            return res.status(404).json({ message: "Teacher not found" });
        }
        return res.json(data[0]);
    });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Deleting teacher with ID: ${id}`); // Log received ID
    const sql = "DELETE FROM teacher WHERE ID = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json({ message: "Error deleting data" });
        }
        if (result.affectedRows === 0) {
            console.log('Teacher not found'); // Log when teacher is not found
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.json({ message: "Teacher deleted successfully" });
    });
});

app.post('/create', (req, res) => {
    const { name, email } = req.body;
    const checkSql = "SELECT * FROM teacher WHERE Email = ?";
    db.query(checkSql, [email], (err, result) => {
        if (err) {
            console.error('Error checking data:', err);
            return res.status(500).json({ message: "Error checking data" });
        }
        if (result.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        } else {
            const sql = "INSERT INTO teacher (Name, Email) VALUES (?, ?)";
            db.query(sql, [name, email], (err, data) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.status(500).json({ message: "Error inserting data" });
                }
                return res.status(201).json({ message: "Teacher created successfully", data });
            });
        }
    });
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    console.log(`Updating teacher with ID: ${id}`); // Log received ID
    const sql = "UPDATE teacher SET Name = ?, Email = ? WHERE ID = ?";
    db.query(sql, [name, email, id], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json({ message: "Error updating data" });
        }
        if (result.affectedRows === 0) {
            console.log('Teacher not found'); // Log when teacher is not found
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.json({ message: "Teacher updated successfully", result });
    });
});

app.listen(8082, () => {
    console.log("Server is running on port 8082");
});
