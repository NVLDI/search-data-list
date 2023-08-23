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
const KA_db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'KA_Data'
});

const MH_db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'MH_Data'
});


db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the Tamil Nadu database');
  }
});

KA_db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the Karnataka database');
  }
});

MH_db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the Maharashtra database');
  }
});

// TamilNadu-API endpoint to handle search
app.get('/TN-api/c_fnameSearch', (req, res) => {
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

app.get('/TN-api/cname_AddressSearch', (req, res) => {
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

app.get('/TN-api/voterSearch', (req, res) => {
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

app.get('/TN-api/fname_c_house_no', (req, res) => {
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

app.get('/TN-api/c_house_no', (req, res) => {
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

app.get('/TN-api/cname_dob', (req, res) => {
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

app.get('/TN-api/mobile', (req, res) => {
  const Mobile = req.query.Mobile;

  const query = `SELECT * FROM vid WHERE mobile LIKE ?`;
  db.query(query, [`%${Mobile}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

// Karnataka-API endpoint to handle search
app.get('/KA-api/mobile', (req, res) => {
  const Mobile = req.query.Mobile;

  const query = `SELECT * FROM ka_data WHERE mobile LIKE ?`;
  KA_db.query(query, [`%${Mobile}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/KA-api/cname_AddressSearch', (req, res) => {
  const CustName = req.query.cname;
  const Address = req.query.address;

  const query = `SELECT * FROM ka_data WHERE cname LIKE ? AND address LIKE ?`;
  KA_db.query(query, [`%${CustName}%`,`%${Address}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/KA-api/cname_PAddressSearch', (req, res) => {
  const CustName = req.query.cname;
  const PAddress = req.query.address;

  const query = `SELECT * FROM ka_data WHERE cname LIKE ? AND paddress LIKE ?`;
  KA_db.query(query, [`%${CustName}%`,`%${PAddress}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/KA-api/c_fnameSearch', (req, res) => {
  const CustName = req.query.cname;
  const FatherName = req.query.fatherName;

  const query = `SELECT * FROM ka_data WHERE cname LIKE ? AND fname LIKE ?`;
  KA_db.query(query, [`%${CustName}%`,`%${FatherName}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/KA-api/cname_altMobileSearch', (req, res) => {
  const CustName = req.query.cname;
  const AltNo = req.query.altNo;

  const query = `SELECT * FROM ka_data WHERE cname LIKE ? AND altno LIKE ?`;
  KA_db.query(query, [`%${CustName}%`,`%${AltNo}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/KA-api/cname_dob', (req, res) => {
  const CustName = req.query.cname;
  const dob = req.query.DOB;

  const query = `SELECT * FROM ka_data WHERE cname LIKE ? AND dob LIKE ?`;
  KA_db.query(query, [`%${CustName}%`,`%${dob}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/KA-api/email', (req, res) => {
  const Email = req.query.Email;

  const query = `SELECT * FROM ka_data WHERE email LIKE ?`;
  KA_db.query(query, [`%${Email}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/KA-api/uid_pan', (req, res) => {
  const UID = req.query.UID;
  const PAN = req.query.Pancard;

  const query = `SELECT * FROM ka_data WHERE uid LIKE ? OR pan LIKE ?`;
  KA_db.query(query, [`%${UID}%`,`%${PAN}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/KA-api/Pin_Code', (req, res) => {
  const PinCode = req.query.pincode;
 
  const query = `SELECT * FROM ka_data WHERE address LIKE ? OR paddress LIKE ? OR paddress LIKE ?`;
  KA_db.query(query, [`%${PinCode}%`,`%${PinCode}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/KA-api/Distr_Taluk_Village', (req, res) => {
  const District = req.query.District;
  const Taluk = req.query.Taluk;
  const Village = req.query.Village;

  const query = `SELECT * FROM ka_data WHERE address LIKE ? OR paddress LIKE ?`;
  KA_db.query(query, [`%${District}%`,`%${Taluk}%`,`%${Village}%`], (err, results) => {
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
