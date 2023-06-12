import React from 'react'
import Sidebar from '../Components/Sidebar'
import TopBar from '../Components/Appbar'
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
export default function Tamilnadu() {
    const handleSearch = (e) => {
        
    };
  return (
    <div>
        <TopBar/>
        <Sidebar/>
        <div className='container'>
            <h1>Tamil Nadu Customer Search Engine</h1>
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
      <Table aria-label="simple table" >
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
            
          </TableBody>
          </Table>
          </TableContainer>
          </div>
        </div>
    </div>
  )
}
