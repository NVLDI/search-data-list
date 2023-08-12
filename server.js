const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
app.use(cors());
const port = 5001;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'TN_V_DATA'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// API endpoint to handle search
app.get('/api/c_fnameSearch', (req, res) => {
  const CustName = req.query.cname;
  const FatherName = req.query.fatherName;

  const query = `SELECT * FROM vid WHERE cname LIKE ? AND fname LIKE ?`;
  db.query(query, [`%${CustName}%`,`%${FatherName}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/cname_AddressSearch', (req, res) => {
  const CustName = req.query.cname;
  const Address = req.query.address;

  const query = `SELECT * FROM vid WHERE cname LIKE ? AND c_house_no LIKE ?`;
  db.query(query, [`%${CustName}%`,`%${Address}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/voterSearch', (req, res) => {
  const Voter_ID = req.query.voter;

  const query = `SELECT * FROM vid WHERE adr LIKE ?`;
  db.query(query, [`%${Voter_ID}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/fname_c_house_no', (req, res) => {
  const FatherName = req.query.fatherName;
  const Address = req.query.address;

  const query = `SELECT * FROM vid WHERE fname LIKE ? AND c_house_no LIKE ?`;
  db.query(query, [`%${FatherName}%`,`%${Address}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/c_house_no', (req, res) => {
  const Address = req.query.address;
  
  const query = `SELECT * FROM vid WHERE c_house_no LIKE ?`;
  db.query(query, [`%${Address}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/cname_dob', (req, res) => {
  const CustName = req.query.cname;
  const dob = req.query.DOB;

  const query = `SELECT * FROM vid WHERE cname LIKE ? AND dob LIKE ?`;
  db.query(query, [`%${CustName}%`,`%${dob}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
