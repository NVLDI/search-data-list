import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar'
import TopBar from '../Components/Appbar'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell ,{ tableCellClasses }from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './State.css'
import { styled } from '@mui/material/styles';
import AWS from 'aws-sdk';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


AWS.config.update({
  accessKeyId: 'AKIAZQ6GO2YKP2WF74FF',
  secretAccessKey: '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',
  region: 'ap-south-1'
});
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
export default function TamilNadu_Data() {
    const [searchCount, setSearchCount] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [attributeName, setAttributeName] = useState('');
  const [tableData, setTableData] = useState([]);
  const dynamodb = new AWS.DynamoDB.DocumentClient();
    const handleSearch = (e) => {
      e.preventDefault();
      const params = {
        TableName: 'TN-Data-Main',
        KeyConditionExpression: `${attributeName} = :value`,
        ExpressionAttributeValues: {
          ':value': searchValue
        }
      };
      dynamodb.query(params, (err, data) => {
        if (err) {
          console.error(err);
          alert('Unauthorized data search, you are not allowed to search');
        } else {
          setTableData(data.Items);
        }
      });
    };
    const handleSearchAll = () => {
      const params = {
        TableName: 'TN-Data-Main',
        Limit: parseInt(searchCount, 10)
      };
      dynamodb.scan(params, (err, data) => {
        if (err) {
          console.error(err);
          alert('Unauthorized data search, you are not allowed to search');
        } else {
          setTableData(data.Items);
        }
      });
    };
    const decodeBase64ToInt = (base64String) => {
      const decodedString = atob(base64String);
      const byteArray = new Uint8Array(decodedString.length);
      for (let i = 0; i < decodedString.length; i++) {
        byteArray[i] = decodedString.charCodeAt(i);
      }
      const integerValue = byteArray.reduce((acc, byte) => (acc << 8) + byte, 0);
      const numString = integerValue.toString();
    if (numString.length < 10) {
      const data = numString.padStart(10, '0'); // Pad with leading zeros if less than 10 digits
      const reversedString = data.toString().split('').reverse().join('').replace(/\D/g, '0');
      return parseInt(reversedString, 10);
    } else if (numString.length > 10) {
      const data =  numString.slice(0, 10); // Truncate to 10 digits if more than 10 digits
      const reversedString = data.toString().split('').reverse().join('').replace(/\D/g, '0');
      return parseInt(reversedString, 10);
    }
    else 
    {
      const reversedString = integerValue.toString().split('').reverse().join('').replace(/\D/g, '0');
      return parseInt(reversedString, 10);
    }
      
    };
  return (
    <div>
        <TopBar/>
        <Sidebar/>
        <div className='container'>
            <h1>Tamil Nadu Search Engine</h1>
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '20ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label" size="small">Attribute</InputLabel>
       <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={attributeName}
    size="small"
    label='Attribute'
    onChange={(e) => setAttributeName(e.target.value)}
  >
    <MenuItem value='mobile'>Mobile</MenuItem>
    <MenuItem value='cname'>Name</MenuItem>
    <MenuItem value='age'>Age</MenuItem>
    <MenuItem value='adr'>Voter ID</MenuItem>
  </Select>
  </FormControl>
      <TextField id="outlined-basic" label="Search Here" size="small" variant="outlined" value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}/>
        <Button variant="contained" onClick={handleSearch}>Search</Button>
        <TextField id="outlined-basic" label="Enter number of rows" size="small" variant="outlined" value={searchCount}
        onChange={(e) => setSearchCount(e.target.value)}/>
        <Button variant="contained" onClick={handleSearchAll}>Search all</Button>
        </Box>
        <div className='Table-Container'>
      <TableContainer component={Paper}>
      <Table aria-label="simple table" >
      <TableHead >
          <TableRow>
            <StyledTableCell style={{ width: 160 }}>Mobile</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Customer Name</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Father Name</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Gender</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Age</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Date of birth</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>House Number</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>House 2nd Number</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Voter ID</StyledTableCell>
            </TableRow>
      </TableHead>
        <TableBody >
        {tableData.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{decodeBase64ToInt(item.mobile)}</StyledTableCell>
              <StyledTableCell>{item.cname}</StyledTableCell>
              <StyledTableCell>{item.fname}</StyledTableCell>
              <StyledTableCell>{item.gender}</StyledTableCell>
              <StyledTableCell>{item.age}</StyledTableCell>
              <StyledTableCell>{item.dob}</StyledTableCell>
              <StyledTableCell>{item.c_house_no}</StyledTableCell>
              <StyledTableCell>{item.c_house_no_v1}</StyledTableCell>
              <StyledTableCell>{item.adr}</StyledTableCell>
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
