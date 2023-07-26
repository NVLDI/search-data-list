import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar'
import TopBar from '../Components/Appbar'
import './State.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell ,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
export default function Hyderabad() {
  const [searchCount, setSearchCount] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [attributeName, setAttributeName] = useState('');
  const [tableData, setTableData] = useState([]);
  const dynamodb = new AWS.DynamoDB.DocumentClient();
    const handleSearch = (e) => {
      e.preventDefault();
      const params = {
        TableName: 'HY-Data',
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
        TableName: 'HY-Data',
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
  return (
    <div>
        <TopBar/>
        <Sidebar/>
        <div className='container'>
            <h1>Hyderabad Search Engine</h1>
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
    <MenuItem value='MOBILE'>Mobile</MenuItem>
    <MenuItem value='CNAME'>Name</MenuItem>
    <MenuItem value='STREET'>Street</MenuItem>
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
            <StyledTableCell style={{ width: 160 }}>CName</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Age</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>District</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>D.O.B</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>FName</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>H.No</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>HouseHold ID</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Mandal</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Nominee Name</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Nominee Age</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Nominee Relation</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Street</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>UID-Number</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Village</StyledTableCell>
            </TableRow>
      </TableHead>
        <TableBody >
        {tableData.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{item.MOBILE}</StyledTableCell>
              <StyledTableCell>{item.CNAME}</StyledTableCell>
              <StyledTableCell>{item.AGE}</StyledTableCell>
              <StyledTableCell>{item.DISTRICT}</StyledTableCell>
              <StyledTableCell>{item.DOB_DT}</StyledTableCell>
              <StyledTableCell>{item.FNAME}</StyledTableCell>
              <StyledTableCell>{item.HNO}</StyledTableCell>
              <StyledTableCell>{item.HOUSEHOLD_ID}</StyledTableCell>
              <StyledTableCell>{item.MANDAL}</StyledTableCell>
              <StyledTableCell>{item.NOMINEE_NAME}</StyledTableCell>
              <StyledTableCell>{item.NOMINEE_AGE}</StyledTableCell>
              <StyledTableCell>{item.NOMINEE_RELATION}</StyledTableCell>
              <StyledTableCell>{item.STREET}</StyledTableCell>
              <StyledTableCell>{item.UID_NUM}</StyledTableCell>
              <StyledTableCell>{item.VILLAGE}</StyledTableCell>
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
