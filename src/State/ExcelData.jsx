import React, { useState } from 'react';
import * as XLSX from "xlsx/xlsx";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './State.css'
import Sidebar from '../Components/Sidebar'
import TopBar from '../Components/Appbar'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const { result } = event.target;
      const workbook = XLSX.read(result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 , range: 1 });
      setData(excelData);
      setFilteredData(excelData);
    };
    reader.readAsBinaryString(file);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredData = data.filter((row) =>
      row.join('').toLowerCase().includes(searchTerm)
    );
    setFilteredData(filteredData);
  };
  
  return (
    <div>
      <TopBar/>
        <Sidebar/>
        <div className='container'>
      <h1>Excel Data Search</h1>
      <input type="file" accept=".xlsx" onChange={handleFileChange}/>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { mb: 4, width: '50%' ,mt: 1},
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Search Here" variant="outlined"  onChange={handleSearch}/>
      </Box>
      <div className='Table-Container'>
        <TableContainer component={Paper}>
      <Table aria-label="simple table">
      <TableHead >
          <TableRow>
            <TableCell style={{ width: 160 }}>State</TableCell>
            <TableCell style={{ width: 160 }}>Source</TableCell>
            <TableCell style={{ width: 160 }}>mobile</TableCell>
            <TableCell style={{ width: 160 }}>DOA</TableCell>
            <TableCell style={{ width: 160 }}>CType</TableCell>
            <TableCell style={{ width: 160 }}>CName</TableCell>
            <TableCell style={{ width: 160 }}>DOB</TableCell>
            <TableCell style={{ width: 160 }}>Full Name</TableCell>
            <TableCell style={{ width: 160 }}>Address 1</TableCell>
            <TableCell style={{ width: 160 }}>Address 2</TableCell>
            <TableCell style={{ width: 160 }}>Email</TableCell>
            <TableCell style={{ width: 160 }}>GST</TableCell>
            <TableCell style={{ width: 160 }}>ID</TableCell>
            <TableCell style={{ width: 160 }}>AlterNo</TableCell>
            <TableCell style={{ width: 160 }}>Gender</TableCell>
            <TableCell style={{ width: 160 }}>Vid</TableCell>
            </TableRow>
      </TableHead>
        <TableBody >
        {filteredData.map((row, index) => (
            <TableRow key={index}>
              {row.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
          </TableBody>
          </Table>
          </TableContainer>
          <br/>
          <br/>
     </div>
    </div>
    </div>
  );
}

export default App;

