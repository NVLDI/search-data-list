import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar'
import TopBar from '../Components/Appbar'
import './State.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell ,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'; 
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
export default function TamilNaduLocal() {
    const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
     
      const response = await axios.get(`http://localhost:5001/api/search?searchTerm=${searchTerm}`);
      setSearchResults(response.data);
      
    } catch (error) {
        console.error('Other Error:', error);
    }
  };
  return (
    <div>
         <TopBar/>
        <Sidebar/>
        <div className='container'>
            <h1>TamilNadu Local Search Engine</h1>
           
     
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="mobile" control={<Radio />} label="Mobile" />
        <FormControlLabel value="cname_c_house_no" control={<Radio />} label="Father's Name & Address" />
        <FormControlLabel value="c_house_no" control={<Radio />} label="Address" />
        <FormControlLabel value="cname_dob" control={<Radio />} label="Customer Name & DOB" />
        <FormControlLabel value="cname_fname" control={<Radio />} label="Customer Name & Father Name" />
        <FormControlLabel value="cname-c_house_no" control={<Radio />} label="Customer Name & Address" />
        <FormControlLabel value="adr" control={<Radio />} label="Voter-ID" />
      </RadioGroup>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '20ch' },
      }}
      noValidate
      autoComplete="off"
    >
       <TextField id="outlined-basic" label="Search Here" size="small" variant="outlined" value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}/>
       
         <Button variant="contained" onClick={handleSearch}>Search</Button>
    </Box>
      <div className='Table-Container'>
      <TableContainer component={Paper}>
      <Table aria-label="simple table" >
      <TableHead >
          <TableRow>
            <StyledTableCell style={{ width: 160 }}>Mobile</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Customer Name</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Age</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>D.O.B</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Father Name</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Gender</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Address 1</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Address 2</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Voter-ID</StyledTableCell>
            </TableRow>
      </TableHead>
        <TableBody >
        {searchResults.map((result, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{result.mobile}</StyledTableCell>
              <StyledTableCell>{result.cname}</StyledTableCell>
              <StyledTableCell>{result.age}</StyledTableCell>
              <StyledTableCell>{result.dob}</StyledTableCell>
              <StyledTableCell>{result.fname}</StyledTableCell>
              <StyledTableCell>{result.gender}</StyledTableCell>
              <StyledTableCell>{result.c_house_no}</StyledTableCell>
              <StyledTableCell>{result.c_house_no_v1}</StyledTableCell>
              <StyledTableCell>{result.adr}</StyledTableCell>
            </StyledTableRow>
          ))}
          </TableBody>
          </Table>
          </TableContainer>
          </div>
      </div>
    </div>
  )
}